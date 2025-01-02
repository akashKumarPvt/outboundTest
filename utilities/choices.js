import { client, dbName } from "../db/index.db.js";
// import { person1 } from "../middlewares/getPerson.middleware.js";
import { ObjectId } from "mongodb";



export async function setUserChoice(choosed, person1) {
  var userChoices = person1?.userChoices || {};
  console.log(person1.name, choosed, "person name , choice");
  try {
    const db = client.db(dbName);
    const collection = db.collection("ayushCallingData");
    const otherCollection = db.collection("userPrevChoices");

    const dtmfMappings = [
      { key: "dtmf1", value: "Language" },
      { key: "dtmf2", value: "FinancialConstraintoptions" },
      { key: "dtmf3", value: "FinLoss" },
      { key: "dtmf41", value: "BusinessLoss" },
      { key: "dtmf42", value: "Jobloss" },
      { key: "dtmf4", value: "SettlementOptions" },
      { key: "dtmf51", value: "FamilyIncome" },
      { key: "dtmf52", value: "ThreeEqualInstallment" },
      { key: "dtmf53", value: "OnePaymentInstallment" },
      { key: "dtmf5", value: "Entered Aadhaar Number" },
      { key: "dtmf6", value: "Entered OTP" },
      { key: "dtmf7", value: "Verified/Not-Verified" },
    ];

    // we are finding the index of the current dtmf 
    let currentIndex = dtmfMappings.findIndex((mapping) => mapping.key === person1.setDtmf);
    if (currentIndex === -1) {
      throw new Error("Invalid DTMF key");
    }

    // check if the keys in userChoices are in order according to dtmfMappings
    const validKeys = dtmfMappings.slice(0, currentIndex + 1).map(mapping => mapping.value);
    const keysToRemove = Object.keys(userChoices).filter(key => !validKeys.includes(key));

    // Remove keys that are not in the validKeys list
    keysToRemove.forEach(key => delete userChoices[key]);

    // Reset userChoices if dtmf1 is selected
    // if (person1.setDtmf === "dtmf1") {
    //   userChoices = {};
    // }

    userChoices[dtmfMappings[currentIndex].value] = choosed;

    // const existingDoc = await collection.findOne({ _id: person1._id });

    // if (!existingDoc) {
    //   await collection.insertOne({
    //     _id: person1._id,
    //     phone: person1.phone,
    //     userChoices: {},
    //     createdAt: new Date(),
    //   });
    // }

    const updateValue = await collection.updateOne(
      { _id: person1._id },
      { $set: { userChoices: userChoices } }
    );

    // if (
    //   person1.setDtmf === "dtmf7" ||
    //   (["answered", "hangup"].includes(person1.prevInfo?.status) &&
    //     person1.prevInfo?.out &&
    //     person1.prevInfo?.callEnd &&
    //     person1.prevInfo.startCall !== 1713615594)
    // ) {
    //   const filter = { personId: person1._id };
    //   const update = {
    //     $set: {
    //       personId: person1._id,
    //       phone: person1.phone,
    //       userChoices: userChoices,
    //     },
    //   };
    //   const options = { upsert: true }; // Create new document if not exists
    //   await otherCollection.updateOne(filter, update, options);
    // } else {
    //   const uChId = new ObjectId();
    //   const inserted = await otherCollection.insertOne({
    //     _id: uChId,
    //     personId: person1._id,
    //     phone: person1.phone,
    //     userChoices: {},
    //   });
    // }

  } catch (error) {
    console.error("Error setting userChoice:", error);
    throw error;
  }
}
