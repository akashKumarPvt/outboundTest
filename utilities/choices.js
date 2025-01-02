import { client, dbName } from "../db/index.db.js";
// import { getPerson } from "../middlewares/getPerson.middleware.js";
import { ObjectId } from "mongodb";



export async function setUserChoice(choosed, getPerson) {
  var userChoices = getPerson?.userChoices || {};
  console.log(getPerson.name, choosed, "person name , choice");
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
    let currentIndex = dtmfMappings.findIndex((mapping) => mapping.key === getPerson.setDtmf);
    if (currentIndex === -1) {
      throw new Error("Invalid DTMF key");
    }

    // check if the keys in userChoices are in order according to dtmfMappings
    const validKeys = dtmfMappings.slice(0, currentIndex + 1).map(mapping => mapping.value);
    const keysToRemove = Object.keys(userChoices).filter(key => !validKeys.includes(key));

    // Remove keys that are not in the validKeys list
    keysToRemove.forEach(key => delete userChoices[key]);

    // Reset userChoices if dtmf1 is selected
    // if (getPerson.setDtmf === "dtmf1") {
    //   userChoices = {};
    // }

    userChoices[dtmfMappings[currentIndex].value] = choosed;

    // const existingDoc = await collection.findOne({ _id: getPerson._id });

    // if (!existingDoc) {
    //   await collection.insertOne({
    //     _id: getPerson._id,
    //     phone: getPerson.phone,
    //     userChoices: {},
    //     createdAt: new Date(),
    //   });
    // }

    const updateValue = await collection.updateOne(
      { _id: getPerson._id },
      { $set: { userChoices: userChoices } }
    );

    // if (
    //   getPerson.setDtmf === "dtmf7" ||
    //   (["answered", "hangup"].includes(getPerson.prevInfo?.status) &&
    //     getPerson.prevInfo?.out &&
    //     getPerson.prevInfo?.callEnd &&
    //     getPerson.prevInfo.startCall !== 1713615594)
    // ) {
    //   const filter = { personId: getPerson._id };
    //   const update = {
    //     $set: {
    //       personId: getPerson._id,
    //       phone: getPerson.phone,
    //       userChoices: userChoices,
    //     },
    //   };
    //   const options = { upsert: true }; // Create new document if not exists
    //   await otherCollection.updateOne(filter, update, options);
    // } else {
    //   const uChId = new ObjectId();
    //   const inserted = await otherCollection.insertOne({
    //     _id: uChId,
    //     personId: getPerson._id,
    //     phone: getPerson.phone,
    //     userChoices: {},
    //   });
    // }

  } catch (error) {
    console.error("Error setting userChoice:", error);
    throw error;
  }
}
