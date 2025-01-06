import express from "express"
import cors from "cors";
import axios from "axios";
import { getPerson, savePrevInfo } from "./middlewares/getPerson.middleware.mjs";
import { connectToMongoDB, client, dbName } from "./db/index.db.js";
import { mJsonPara1, masterCallFunction } from "./utilities/masterCall.js";
import * as hindi from "./languages/hindi.lang.js";
import * as english from "./languages/english.lang.js";
import * as bangla from "./languages/bangla.lang.js";
import * as marathi from "./languages/marathi.lang.js";
import * as telugu from "./languages/telugu.lang.js";
import * as tamil from "./languages/tamil.lang.js";
import * as gujarati from "./languages/gujarati.lang.js";
import * as kannada from "./languages/kannada.lang.js";
import * as malayalam from "./languages/malayalam.lang.js";
import EventEmitter from "events";
import { ObjectId } from "mongodb";
EventEmitter.defaultMaxListeners = 15;

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(getPerson);
app.use(savePrevInfo);

const port = process.env.PORT || 5000;
export const actionUrl = "https://0937-106-219-162-241.ngrok-free.app/dtmf";
export const CLIENTKEY = "962c8a8a3ea6b34f31888a5256e2b93b:794703a1964c92e83aef52aaa0d6db77";
export const SECRETKEY = "ltAOpD5f4bTP0zFWVO4cmUg8n57M4NhMl1Le104AROpUUj1P3x5oQGjt3sXdhpKMQ";


app.post("/numberToCall", async (req, res) => {
    let number = req.body.number;
    let json = { ...mJsonPara1 };
    json.to = +number;
    let startingTimestamp = new Date().getTime().toString();
    json.extra_params = { type: "outbound", startingTimestamp: startingTimestamp };
    json.pcmo = [
        {
            action: "play_get_input",
            file_name:
                "1712297470293LanguageOptionsPlaywav4c2f98e0-f313-11ee-8950-d73e6adcd329_piopiy.wav",
            max_digit: 1,
            max_retry: 2,
            action_url: actionUrl,
        },
    ];
    let response = await masterCallFunction(
        "https://rest.telecmi.com/v2/ind_pcmo_make_call",
        json
    );

    res.send(response);
});

app.post("/numbersToCall", async (req, res) => {
    let numbers = req.body.numbers; // Assuming req.body.numbers is an array of numbers
    let responses = [];
    let startingTimestamp = new Date().getTime().toString();

    for (let number of numbers) {
        let json = { ...mJsonPara1 };
        json.to = +number;
        json.extra_params = {
            type: "outbound",
            startingTimestamp: startingTimestamp
        };
        json.pcmo = [
            {
                action: "play_get_input",
                file_name:
                    "1712297470293LanguageOptionsPlaywav4c2f98e0-f313-11ee-8950-d73e6adcd329_piopiy.wav", //language selection
                max_digit: 1,
                max_retry: 2,
                action_url: actionUrl,
            },
        ];

        try {
            let response = await masterCallFunction(
                "https://rest.telecmi.com/v2/ind_pcmo_make_call",
                json
            );
            responses.push(response);
        } catch (error) {
            console.error("Error making call:", error);
            responses.push({ error: error.message });
        }
    }

    res.send(responses);
});

app.post("/answerecdr", async (req, res) => {
    var cdr = req.body;
    console.log(cdr, "answer cdr");
    let phone = req.body.from.trim();
    const db = client.db(dbName);
    const collection = db.collection("usersData");
    const result2 = await client2.connect();
    const db2 = result2.db(dbName);
    const collection2 = db2.collection("CallingData2");
    let person1 = await collection.findOne({
      $or: [{ phone: +phone }, { phone: phone + "" }],
    });
    let person2 = {};
    if (cdr.to == " 918035731375") {
      let persons = await collection2
        .find({
          $or: [
            { phone: +phone },
            { phone: phone + "" }
          ],
        })
        .sort({ callTime: -1 })
        .limit(1)
        .toArray();
      if (persons) {
        person2 = persons[0];
      }
    }
  
    if (req.body.to == 918035731373) {
      res.send([
        {
          action: "param",
          text: `{ "type": "usersData" }`,
  
        },
        {
          action: "play",
          file_name:
            "1689677048969nbfcandbankintrofordefaulterswav0667cdc0-2558-11ee-a155-59e5d3b0d16d_piopiy.wav",
        },
  
        {
          action: "play_get_input",
          file_name:
            "1689677035869nameofbankandnbfcwavfe9b30f0-2557-11ee-a155-59e5d3b0d16d_piopiy.wav",
          max_digit: 1,
          max_retry: 2,
          action_url: actionUrl,
        },
      ]);
    } else if (req.body.to == 918035731375) {
      res.send([
        {
          action: "param",
          text: "{type=CallingData2}",
        },
        {
          action: "record",
          //"_id":person2._id   file_name:"1689677048969nbfcandbankintrofordefaulterswav0667cdc0-2558-11ee-a155-59e5d3b0d16d_piopiy.wav",
        },
        {
          action: "bridge",
          duration: 300,
          timeout: 20,
          from: 918035731375,
          loop: 2,
          connect: [
            {
              type: "pstn",
              number: +person2.uPhone,
            },
          ],
        },
      ]);
    }
    else if (req.body.to == 918035731376) {
      [
        // {
        //   action: "play",
        //   file_name:
        //     "1713261621446IntroAllwav230d5c90-fbd8-11ee-9a4e-ddacf980bad8_piopiy.wav", //intro of murthy and PrivateCourt
        // },
        {
          action: "play_get_input",
          file_name:
            "1712297470293LanguageOptionsPlaywav4c2f98e0-f313-11ee-8950-d73e6adcd329_piopiy.wav", //language selection
          max_digit: 1,
          max_retry: 2,
          action_url: actionUrl,
        },
      ];
    } else {
      res.send([
        {
          action: "param",
          text: `{ "type": "salesData" }`,
        },
        {
          action: "play_get_input",
          file_name:
            "1690876772203Salescallwav592d90f0-3041-11ee-9d37-33aa719412c2_piopiy.wav",
          max_digit: 1,
          max_retry: 2,
          action_url: "https://serverfile1.onrender.com/dtmf",
        },
      ]);
    }
  });


export async function setDtmfUser(dtmfStr, getPerson) {
    if (!getPerson || !getPerson._id) {
        console.error("Invalid person object:", getPerson);
        throw new Error("Invalid person object or missing '_id'.");
    }

    console.log("Processing person:", getPerson);
    try {
        const db = client.db(dbName);
        const collection = db.collection("ayushCallingData");

        const result = await collection.updateOne(
            { _id: getPerson._id },
            { $set: { setDtmf: dtmfStr } }
        );

        if (result.matchedCount === 0) {
            console.warn("No matching document found for _id:", getPerson._id);
        } else {
            console.log("DTMF successfully updated:", dtmfStr);
        }
    } catch (error) {
        console.error("Error setting DTMF:", error.message);
        throw error;
    }
}

async function handleLanguageSelection(dtmf, getPerson) {
    if (!dtmf || !getPerson || !getPerson._id) {
        console.error("Invalid input: dtmf or getPerson is missing or invalid.");
        throw new Error("Invalid input: dtmf or getPerson._id is required.");
    }

    let selectedLanguage = getPerson.language; // Default to the user's existing language

    if (getPerson.setDtmf === "dtmf1") {
        switch (dtmf.dtmf) {
            case "0":
                selectedLanguage = "english";
                break;
            case "1":
            case "6": // Hindi for both 1 and 6
                selectedLanguage = "hindi";
                break;
            case "2":
                selectedLanguage = "bangla";
                break;
            case "3":
                selectedLanguage = "marathi";
                break;
            case "4":
                selectedLanguage = "telugu";
                break;
            case "5":
                selectedLanguage = "tamil";
                break;
            case "7":
                selectedLanguage = "kannada";
                break;
            case "8":
                selectedLanguage = "malayalam";
                break;
            default:
                console.warn("Invalid DTMF input, falling back to default language:", selectedLanguage);
        }

        try {
            const db = client.db(dbName);
            const collection = db.collection("ayushCallingData");
            const result = await collection.updateOne(
                { _id: getPerson._id },
                { $set: { language: selectedLanguage } }
            );

            if (result.matchedCount === 0) {
                console.warn("No matching document found for _id:", getPerson._id);
            } else {
                console.log("Language successfully updated to:", selectedLanguage);
            }
        } catch (error) {
            console.error("Error updating language in database:", error.message);
            throw error;
        }
    }

    return selectedLanguage;
};

app.post("/dtmf", async (req, res) => {
    const dtmf = req.body;
    console.log("Dtmf : ", dtmf.dtmf);
    const selectedLanguage = await handleLanguageSelection(dtmf, req.body.person);

    if (req.body.person.setDtmf === "dtmf5") {
        const aadhaarInput = req.body.dtmf;
        aadhaar.processAadhaarInput(aadhaarInput, req.body.person);
    }
    if (req.body.person.setDtmf === "dtmf6") {
        const otpInput = req?.body?.dtmf;
        processOtpInput(otpInput, req.body.person);
    }
    switch (selectedLanguage) {
        case "english":
            handleEnglishDtmf(req.body.person.setDtmf, dtmf.dtmf, res, req.body.person);
            break;
        case "hindi":
            handleHindiDtmf(req.body.person.setDtmf, dtmf.dtmf, res, req.body.person);
            break;
        case "bangla":
            handleBanglaDtmf(req.body.person.setDtmf, dtmf.dtmf, res, req.body.person);
            break;
        case "marathi":
            handleMarathiDtmf(req.body.person.setDtmf, dtmf.dtmf, res, req.body.person);
            break;
        case "telugu":
            handleTeluguDtmf(req.body.person.setDtmf, dtmf.dtmf, res, req.body.person);
            break;
        case "tamil":
            handleTamilDtmf(req.body.person.setDtmf, dtmf.dtmf, res, req.body.person);
            break;
        case "gujarati":
            handleGujaratiDtmf(req.body.person.setDtmf, dtmf.dtmf, res, req.body.person);
            break;
        case "malayalam":
            handleMalayalamDtmf(req.body.person.setDtmf, dtmf.dtmf, res, req.body.person);
            break;
        case "kannada":
            handleKannadaDtmf(req.body.person.setDtmf, dtmf.dtmf, res, req.body.person);
            break;
        default:
            handleHindiDtmf(req.body.person.setDtmf, dtmf.dtmf, res, req.body.person);
            break;
    }
});

async function aadhaarOtpPart(data, route) {
    const updated_data = JSON.stringify(data)
    const options = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.invincibleocean.com/invincible/aadhaarVerification/${route}`,
        headers: {
            'Content-Type': 'application/json',
            'clientId': CLIENTKEY,
            'secretKey': SECRETKEY
        },
        data: updated_data
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
        return { error: "Please Enter correct Aadhaar no." };
    }
};


//this function will take the input that is aadhaar number
export const aadhaar = {
    processAadhaarInput: async function (aadhaarInput, getPerson) {
        if (!aadhaarInput || typeof aadhaarInput !== "string" ) {
            console.error("Invalid Aadhaar input. Must be a 12-digit numeric string.");
            throw new Error("Invalid Aadhaar input. Must be a 12-digit numeric string.");
        }
        if (!getPerson || !getPerson._id) {
            console.error("Invalid getPerson object. Missing _id.");
            throw new Error("Invalid getPerson object. Missing _id.");
        }

        try {
            const aadhaarNum = aadhaarInput;
            const db = client.db(dbName);
            const collection = db.collection("aadharDetailsCalling");

            const dataToUpdate = {
                aadhaar_number: aadhaarNum,
                personId: getPerson._id,
                createdAt: new Date(),
            };

            //update aadhaar number in the ayushDetailCalling

            const existingRecord = await collection.findOne({ aadhaar_number: aadhaarInput });
            if (existingRecord) {
                console.error("Aadhaar number already exists in the database.");
                throw new Error("Aadhaar number already exists.");
            }

            // Insert the new Aadhaar data
            const result = await collection.insertOne(dataToUpdate);
            console.log("Data inserted successfully:", result);


        } catch (error) {
            console.error("Error storing Aadhaar number:", error.message);
            throw new Error("Failed to process Aadhaar input. Please try again.");
        }
    },
};

export async function getAadhaarRefIDDetail(aadhaarNum, getPerson) {
    if (!aadhaarNum || typeof aadhaarNum !== "string") {
        console.error("Invalid Aadhaar number input. It must be a non-empty string.");
        throw new Error("Invalid Aadhaar number input.");
    }
    if (!getPerson || !getPerson._id) {
        console.error("Invalid getPerson object. Missing _id.");
        throw new Error("Invalid getPerson object.");
    }

    console.log("AADHAAR NUMBER IN getAadhaarRefIDDetail FUNCTION:", aadhaarNum, "Type : ", typeof aadhaarNum);

    try {
        const db = client.db(dbName);
        const collection = db.collection("aadharDetailsCalling");

        const aadhaarDocument = await collection.findOne(
            { aadhaar_number: aadhaarNum },
            { sort: { _id: -1 } }
        );

        console.log(aadhaarDocument, "aadhaarDocument");

        if (!aadhaarDocument || !aadhaarDocument.personId.equals(getPerson._id)) {
            console.error("Aadhaar number not found or not associated with the person.");
            return null;
        }

        // Generate OTP
        const aadhaarNumberInDoc = aadhaarDocument?.aadhaar_number
        const data = { aadhaarNumber: aadhaarNumberInDoc };
        const response = await aadhaarOtpPart(data, "requestOtp");

        if (
            response &&
            response.result &&
            response.result.data &&
            response.result.data.client_id
        ) {

            const updateData = {
                client_id: response.result.data.client_id,
                vDate: new Date(),
            };

            await collection.updateOne(
                { aadhaar_number: aadhaarNumberInDoc },
                { $set: updateData },
                { upsert: true }
            );

            console.log("OTP HAS BEEN SENT!!")
            return updateData;

        } else {
            console.error("Error generating OTP for Aadhaar number:", response);
            return null;
        }
    } catch (error) {
        console.error("Error processing Aadhaar OTP:", error.message);
        throw new Error("Failed to process Aadhaar OTP. Please try again.");
    }
}

export async function processOtpInput(otpInput, getPerson) {
    try {
        const db = client.db(dbName);
        const collection = db.collection("aadharDetailsCalling");
        console.log("DTMF Input OTP:", otpInput);
        const otpData = await collection.updateOne(
            { personId: getPerson._id },
            { $set: { otp_number: otpInput } }
        );
        await new Promise((resolve) => setTimeout(resolve, 500));
        return otpData;
    } catch (error) {
        console.error("Error storing OTP number:", error);
        throw error;
    }
};

export async function getAdhaarDetailsOtpUpdate(otpInput, getPerson) {
    console.log(otpInput, getPerson, "DATA AT OTP INPUT")
    try {
        // Validate inputs
        if (!otpInput || !getPerson || !getPerson._id) {
            throw new Error("Invalid OTP input or missing person details");
        }

        const personId = new ObjectId(getPerson._id);
        console.log("Processing Aadhaar OTP for personId:", getPerson?.name);

        const db = client.db(dbName);
        const aadhaarCollection = db.collection("aadharDetailsCalling");
        const userDetailsCollection = db.collection("aadharUserDetails");
        const callingDataCollection = db.collection("ayushCallingData");

        // Fetch Aadhaar records for the person
        const aadhaarDocument = await aadhaarCollection.findOne({ personId });

        if (!aadhaarDocument) {
            console.error("No Aadhaar record found for personId:", personId);
            return null;
        }

        const aadhaarNum = aadhaarDocument.aadhaar_number;

        if (!aadhaarNum) {
            console.warn("Invalid Aadhaar number for person:", getPerson?.name);
            return null;
        }

        console.log("Processing Aadhaar number:", aadhaarNum);

        // Submit OTP for Aadhaar verification
        const data = { otp: otpInput, client_id: aadhaarDocument.client_id };
        const response = await aadhaarOtpPart(data, "submitOtp");

        // Prepare updated Aadhaar details
        const updatedAadhaarDocument = {
            ...aadhaarDocument,
            vDate: new Date(),
            response: response.result?.data,
        };

        delete updatedAadhaarDocument._id;

        // Update user details collection
        await userDetailsCollection.updateOne(
            { _id: personId },
            { $set: updatedAadhaarDocument },
            { upsert: true }
        );

        const aadhaarStatus = response.result?.data?.status === "success_aadhaar" ? "Verified" : "Not-Verified";
        console.log("Aadhaar Status:", aadhaarStatus);

        // Update calling data collection
        await callingDataCollection.updateOne(
            { _id: personId },
            {
                $set: {
                    aadhaarNumber: aadhaarNum,
                    aadhaarStatus,
                },
            },
            { upsert: true }
        );

        return updatedAadhaarDocument;

    } catch (error) {
        console.error("Error in getAdhaarDetailsOtpUpdate:", error);
        throw error;
    }
}


export async function deleteAadhaarDocument(aadhaarNum) {
    try {
        const db = client.db(dbName);
        const collection = db.collection("aadharDetailsCalling");
        const result = await collection.deleteOne({ aadhaar_number: aadhaarNum });
        console.log("Deleted document:", result);
    } catch (error) {
        console.error("Error deleting Aadhaar document:", error);
        throw error;
    }
};

async function handleHindiDtmf(setDtmf, dtmf, res, getPerson) {
    switch (setDtmf) {
        case "dtmf1":
            res.send(await hindi.getDtmf(dtmf, getPerson));
            break;
        case "dtmf2":
            res.send(await hindi.getDtmf2(dtmf, getPerson));
            break;
        case "dtmf3":
            res.send(await hindi.getDtmf3(dtmf, getPerson));
            break;
        case "dtmf41":
            res.send(await hindi.getDtmf4Sec1(dtmf, getPerson));
            break;
        case "dtmf42":
            res.send(await hindi.getDtmf4Sec2(dtmf, getPerson));
            break;
        case "dtmf4":
            res.send(await hindi.getDtmf5(dtmf, getPerson));
            break;
        case "dtmf51":
            res.send(await hindi.getDtmf5Sec1(dtmf, getPerson));
            break;
        case "dtmf52":
            res.send(await hindi.getDtmf5Sec2(dtmf, getPerson));
            break;
        case "dtmf53":
            res.send(await hindi.getDtmf5Sec3(dtmf, getPerson));
            break;
        case "dtmf5":
            res.send(await hindi.getDtmf6(dtmf, getPerson));
            break;
        case "dtmf6":
            res.send(await hindi.getDtmfLast(dtmf, getPerson));
            break;
        default:
            console.log("Invalid setDtmf value for Hindi.");
            break;
    }
    // console.log("SetDTMF : ", setDtmf)
};

async function handleEnglishDtmf(setDtmf, dtmf, res, getPerson) {

    switch (setDtmf) {
        case "dtmf1":
            res.send(await english.getEngDtmf(dtmf, getPerson));
            break;
        case "dtmf2":
            res.send(await english.getEngDtmf2(dtmf, getPerson));
            break;
        case "dtmf3":
            res.send(await english.getEngDtmf3(dtmf, getPerson));
            break;
        case "dtmf41":
            res.send(await english.getEngDtmf4Sec1(dtmf, getPerson));
            break;
        case "dtmf42":
            res.send(await english.getEngDtmf4Sec2(dtmf, getPerson));
            break;
        case "dtmf4":
            res.send(await english.getEngDtmf5(dtmf, getPerson));
            break;
        case "dtmf51":
            res.send(await english.getEngDtmf5Sec1(dtmf, getPerson));
            break;
        case "dtmf52":
            res.send(await english.getEngDtmf5Sec2(dtmf, getPerson));
            break;
        case "dtmf53":
            res.send(await english.getEngDtmf5Sec3(dtmf, getPerson));
            break;
        case "dtmf5":
            res.send(await english.getEngDtmf6(dtmf, getPerson));
            break;
        case "dtmf6":
            res.send(await english.getEngDtmfLast(dtmf, getPerson));
            break;
        default:
            console.log("Invalid setDtmf value for Hindi.");
            break;
    }
};

async function handleBanglaDtmf(setDtmf, dtmf, res, getPerson) {
    switch (setDtmf) {
        case "dtmf1":
            res.send(await bangla.getBenDtmf(dtmf, getPerson));
            break;
        case "dtmf2":
            res.send(await bangla.getBenDtmf2(dtmf, getPerson));
            break;
        case "dtmf3":
            res.send(await bangla.getBenDtmf3(dtmf, getPerson));
            break;
        case "dtmf41":
            res.send(await bangla.getBenDtmf4Sec1(dtmf, getPerson));
            break;
        case "dtmf42":
            res.send(await bangla.getBenDtmf4Sec2(dtmf, getPerson));
            break;
        case "dtmf4":
            res.send(await bangla.getBenDtmf5(dtmf, getPerson));
            break;
        case "dtmf51":
            res.send(await bangla.getBenDtmf5Sec1(dtmf, getPerson));
            break;
        case "dtmf52":
            res.send(await bangla.getBenDtmf5Sec2(dtmf, getPerson));
            break;
        case "dtmf53":
            res.send(await bangla.getBenDtmf5Sec3(dtmf, getPerson));
            break;
        case "dtmf5":
            res.send(await bangla.getBenDtmf6(dtmf, getPerson));
            break;
        case "dtmf6":
            res.send(await bangla.getBenDtmfLast(dtmf, getPerson));
            break;
        default:
            console.log("Invalid setDtmf value for Hindi.");
            break;
    }
};

async function handleMarathiDtmf(setDtmf, dtmf, res, getPerson) {
    switch (setDtmf) {
        case "dtmf1":
            res.send(await marathi.getMarDtmf(dtmf, getPerson));
            break;
        case "dtmf2":
            res.send(await marathi.getMarDtmf2(dtmf, getPerson));
            break;
        case "dtmf3":
            res.send(await marathi.getMarDtmf3(dtmf, getPerson));
            break;
        case "dtmf41":
            res.send(await marathi.getMarDtmf4Sec1(dtmf, getPerson));
            break;
        case "dtmf42":
            res.send(await marathi.getMarDtmf4Sec2(dtmf, getPerson));
            break;
        case "dtmf4":
            res.send(await marathi.getMarDtmf5(dtmf, getPerson));
            break;
        case "dtmf51":
            res.send(await marathi.getMarDtmf5Sec1(dtmf, getPerson));
            break;
        case "dtmf52":
            res.send(await marathi.getMarDtmf5Sec2(dtmf, getPerson));
            break;
        case "dtmf53":
            res.send(await marathi.getMarDtmf5Sec3(dtmf, getPerson));
            break;
        case "dtmf5":
            res.send(await marathi.getMarDtmf6(dtmf, getPerson));
            break;
        case "dtmf6":
            res.send(await marathi.getMarDtmfLast(dtmf, getPerson));
            break;
        default:
            console.log("Invalid setDtmf value for Hindi.");
            break;
    }
};

async function handleTeluguDtmf(setDtmf, dtmf, res, getPerson) {
    switch (setDtmf) {
        case "dtmf1":
            res.send(await telugu.getTelDtmf(dtmf, getPerson));
            break;
        case "dtmf2":
            res.send(await telugu.getTelDtmf2(dtmf, getPerson));
            break;
        case "dtmf3":
            res.send(await telugu.getTelDtmf3(dtmf, getPerson));
            break;
        case "dtmf41":
            res.send(await telugu.getTelDtmf4Sec1(dtmf, getPerson));
            break;
        case "dtmf42":
            res.send(await telugu.getTelDtmf4Sec2(dtmf, getPerson));
            break;
        case "dtmf4":
            res.send(await telugu.getTelDtmf5(dtmf, getPerson));
            break;
        case "dtmf51":
            res.send(await telugu.getTelDtmf5Sec1(dtmf, getPerson));
            break;
        case "dtmf52":
            res.send(await telugu.getTelDtmf5Sec2(dtmf, getPerson));
            break;
        case "dtmf53":
            res.send(await telugu.getTelDtmf5Sec3(dtmf, getPerson));
            break;
        case "dtmf5":
            res.send(await telugu.getTelDtmf6(dtmf, getPerson));
            break;
        case "dtmf6":
            res.send(await telugu.getTelDtmfLast(dtmf, getPerson));
            break;
        default:
            console.log("Invalid setDtmf value for Hindi.");
            break;
    }
};

async function handleTamilDtmf(setDtmf, dtmf, res, getPerson) {
    switch (setDtmf) {
        case "dtmf1":
            res.send(await tamil.getTamDtmf(dtmf, getPerson));
            break;
        case "dtmf2":
            res.send(await tamil.getTamDtmf2(dtmf, getPerson));
            break;
        case "dtmf3":
            res.send(await tamil.getTamDtmf3(dtmf, getPerson));
            break;
        case "dtmf41":
            res.send(await tamil.getTamDtmf4Sec1(dtmf, getPerson));
            break;
        case "dtmf42":
            res.send(await tamil.getTamDtmf4Sec2(dtmf, getPerson));
            break;
        case "dtmf4":
            res.send(await tamil.getTamDtmf5(dtmf, getPerson));
            break;
        case "dtmf51":
            res.send(await tamil.getTamDtmf5Sec1(dtmf, getPerson));
            break;
        case "dtmf52":
            res.send(await tamil.getTamDtmf5Sec2(dtmf, getPerson));
            break;
        case "dtmf53":
            res.send(await tamil.getTamDtmf5Sec3(dtmf, getPerson));
            break;
        case "dtmf5":
            res.send(await tamil.getTamDtmf6(dtmf, getPerson));
            break;
        case "dtmf6":
            res.send(await tamil.getTamDtmfLast(dtmf, getPerson));
            break;
        default:
            console.log("Invalid setDtmf value for Hindi.");
            break;
    }
};

async function handleGujaratiDtmf(setDtmf, dtmf, res, getPerson) {
    switch (setDtmf) {
        case "dtmf1":
            res.send(await gujarati.getGujDtmf(dtmf, getPerson));
            break;
        case "dtmf2":
            res.send(await gujarati.getGujDtmf2(dtmf, getPerson));
            break;
        case "dtmf3":
            res.send(await gujarati.getGujDtmf3(dtmf, getPerson));
            break;
        case "dtmf41":
            res.send(await gujarati.getGujDtmf4Sec1(dtmf, getPerson));
            break;
        case "dtmf42":
            res.send(await gujarati.getGujDtmf4Sec2(dtmf, getPerson));
            break;
        case "dtmf4":
            res.send(await gujarati.getGujDtmf5(dtmf, getPerson));
            break;
        case "dtmf51":
            res.send(await gujarati.getGujDtmf5Sec1(dtmf, getPerson));
            break;
        case "dtmf52":
            res.send(await gujarati.getGujDtmf5Sec2(dtmf, getPerson));
            break;
        case "dtmf53":
            res.send(await gujarati.getGujDtmf5Sec3(dtmf, getPerson));
            break;
        case "dtmf5":
            res.send(await gujarati.getGujDtmf6(dtmf, getPerson));
            break;
        case "dtmf6":
            res.send(await gujarati.getGujDtmfLast(dtmf, getPerson));
            break;
        default:
            console.log("Invalid setDtmf value for Hindi.");
            break;
    }
};

async function handleKannadaDtmf(setDtmf, dtmf, res, getPerson) {
    switch (setDtmf) {
        case "dtmf1":
            res.send(await kannada.getKanDtmf(dtmf, getPerson));
            break;
        case "dtmf2":
            res.send(await kannada.getKanDtmf2(dtmf, getPerson));
            break;
        case "dtmf3":
            res.send(await kannada.getKanDtmf3(dtmf, getPerson));
            break;
        case "dtmf41":
            res.send(await kannada.getKanDtmf4Sec1(dtmf, getPerson));
            break;
        case "dtmf42":
            res.send(await kannada.getKanDtmf4Sec2(dtmf, getPerson));
            break;
        case "dtmf4":
            res.send(await kannada.getKanDtmf5(dtmf, getPerson));
            break;
        case "dtmf51":
            res.send(await kannada.getKanDtmf5Sec1(dtmf, getPerson));
            break;
        case "dtmf52":
            res.send(await kannada.getKanDtmf5Sec2(dtmf, getPerson));
            break;
        case "dtmf53":
            res.send(await kannada.getKanDtmf5Sec3(dtmf, getPerson));
            break;
        case "dtmf5":
            res.send(await kannada.getKanDtmf6(dtmf, getPerson));
            break;
        case "dtmf6":
            res.send(await kannada.getKanDtmfLast(dtmf, getPerson));
            break;
        default:
            console.log("Invalid setDtmf value for Hindi.");
            break;
    }
};

async function handleMalayalamDtmf(setDtmf, dtmf, res, getPerson) {
    switch (setDtmf) {
        case "dtmf1":
            res.send(await malayalam.getMalDtmf(dtmf, getPerson));
            break;
        case "dtmf2":
            res.send(await malayalam.getMalDtmf2(dtmf, getPerson));
            break;
        case "dtmf3":
            res.send(await malayalam.getMalDtmf3(dtmf, getPerson));
            break;
        case "dtmf41":
            res.send(await malayalam.getMalDtmf4Sec1(dtmf, getPerson));
            break;
        case "dtmf42":
            res.send(await malayalam.getMalDtmf4Sec2(dtmf, getPerson));
            break;
        case "dtmf4":
            res.send(await malayalam.getMalDtmf5(dtmf, getPerson));
            break;
        case "dtmf51":
            res.send(await malayalam.getMalDtmf5Sec1(dtmf, getPerson));
            break;
        case "dtmf52":
            res.send(await malayalam.getMalDtmf5Sec2(dtmf, getPerson));
            break;
        case "dtmf53":
            res.send(await malayalam.getMalDtmf5Sec3(dtmf, getPerson));
            break;
        case "dtmf5":
            res.send(await malayalam.getMalDtmf6(dtmf, getPerson));
            break;
        case "dtmf6":
            res.send(await malayalam.getMalDtmfLast(dtmf, getPerson));
            break;
        default:
            console.log("Invalid setDtmf value for Hindi.");
            break;
    }
};

app.listen(port, async () => {
    try {
        console.log(`Server is running on ${port}`);
    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
});
