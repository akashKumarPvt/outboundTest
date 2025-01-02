import { setDtmfUser } from "../index.js";
// import { getPerson } from "../middlewares/getPerson.middleware.js";
import { actionUrl } from "../index.js";
import { setUserChoice } from "../utilities/choices.js";
import { getAadhaarRefIDDetail } from "../index.js";
import { getAdhaarDetailsOtpUpdate } from "../index.js";
import { deleteAadhaarDocument } from "../index.js";
import numberToWords from "number-to-words";

export async function getDtmf(dtmf, getPerson) {
  if (dtmf === "1" || dtmf === "") {
    await setDtmfUser("dtmf2", getPerson);
    await setUserChoice("hindi", getPerson);
    // const loanAmtSpoken = toSpokenNumber(getPerson?.loanAmt || 0);
    // const pendingAmtSpoken = toSpokenNumber(getPerson?.pendingAmt || 0);
    const loanAmtStr=numberToWords.toWords(+getPerson.loanAmt).split(" ").join(".....");
    const pendingAmtStr=numberToWords.toWords(+getPerson.pendingAmt).split(" ").join(".....");
    const organizationStr=getPerson.organization.split(" ").join(".....");
    console.log(loanAmtStr, "loanAmtArr hindi.lang");
    console.log(pendingAmtStr, "pendingAmtArr hindi.lang");
    return [
      // {
      //   action: "play",
      //   file_name: "1717662987878validhindiwavdde1d9e0-23df-11ef-b052-99cad6a21f8f_piopiy.wav", //valid
      // },
      // {
      //   action: "play",
      //   file_name: "1713261194209aadharhindiwav24665250-fbd7-11ee-9a4e-ddacf980bad8_piopiy.wav", //adhaarcard
      // },
      // {
      //   action: "speak",
      //   text: `${organizationStr}`
      // },
      // {
      //   action: "play",
      //   file_name: "1712841320904accorrdingTohindiwav8c67c580-f805-11ee-9a4e-ddacf980bad8_piopiy.wav"
      // },
      // {
      //   action: "play",
      //   file_name: "1712841334914initialAmounthindiwav94c18720-f805-11ee-9a4e-ddacf980bad8_piopiy.wav"
      // },
      // {
      //   action: "speak",
      //   text: `Rupees.. ${loanAmtStr}`
      // },
      // {
      //   action: "play",
      //   file_name: "1712841342572pendingAmounthindiwav9951e4b0-f805-11ee-9a4e-ddacf980bad8_piopiy.wav"
      // },
      // {
      //   action: "speak",
      //   text: `Rupees.. ${pendingAmtStr}`
      // },
      {
        action: "play_get_input",
        file_name:
          "1711539074859financialconstraints6Optionsayushwav85479b10-ec2d-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf1", getPerson);
    return getDtmf("1", getPerson);
  }
}

export async function getDtmf2(dtmf, getPerson) {
  if (dtmf == "1") {
    await setDtmfUser("dtmf3", getPerson);
    await setUserChoice("Financial Loss", getPerson);

    return [
      {
        action: "play_get_input",
        file_name:
          "1713506235940newFinancialLosshindiwavaca70470-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (
    dtmf == "2" ||
    dtmf == "3" ||
    dtmf == "4" ||
    dtmf == "5" ||
    dtmf == "6"
  ) {
    await setDtmfUser("dtmf4", getPerson);
    let userChoice = "";
    switch (dtmf) {
      case "2":
        userChoice = "Missing Payment Details";
        break;
      case "3":
        userChoice = "Dispute due to bad behaviour";
        break;
      case "4":
        userChoice = "No clear loan information";
        break;
      case "5":
        userChoice = "Death Case";
        break;
      case "6":
        userChoice = "Other reasons";
        break;
      default:
        break;
    }
    await setUserChoice(userChoice, getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506278576newSettlementOptionhindiwavc6113660-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf2", getPerson);
    return getDtmf2("1", getPerson);
  }
}

export async function getDtmf3(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf41", getPerson);
    await setUserChoice("business loss", getPerson);

    return [
      {
        action: "play_get_input",
        file_name:
          "1713506246849newBussinessLosshindiwavb3283580-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //bussinessLossOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "2") {
    await setDtmfUser("dtmf42", getPerson);
    await setUserChoice("Job loss", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506264977newJobLosshindiwavbdf5b640-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //joblossOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "3" || dtmf === "4") {
    await setDtmfUser("dtmf4", getPerson);
    let userChoice = dtmf === "3" ? "Health Issue" : "Death of Earning Member";
    await setUserChoice(userChoice, getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506278576newSettlementOptionhindiwavc6113660-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf == "9") {
    console.log("FinancialContraints worked");
    await setDtmfUser("dtmf2", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1711539074859financialconstraints6Optionsayushwav85479b10-ec2d-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf3", getPerson);
    return getDtmf2("1" || "0", getPerson);
  }
}

export async function getDtmf4Sec1(dtmf, getPerson) {
  if (dtmf === "1" || dtmf === "2" || dtmf === "3") {
    await setDtmfUser("dtmf4", getPerson);
    let userChoice = "";
    switch (dtmf) {
      case "1":
        userChoice = "Partner Dispute";
        break;
      case "2":
        userChoice = "Funds held with other vender or client";
        break;
      case "3":
        userChoice = "Monetory Loss";
        break;
      default:
        break;
    }
    await setUserChoice(userChoice, getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506278576newSettlementOptionhindiwavc6113660-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf3", getPerson);
    console.log("FinancialLoss Worked");
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506235940newFinancialLosshindiwavaca70470-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "8") {
    await setDtmfUser("dtmf2", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1711539074859financialconstraints6Optionsayushwav85479b10-ec2d-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf41", getPerson);
    return getDtmf3("1", getPerson);
  }
}

export async function getDtmf4Sec2(dtmf, getPerson) {
  if (dtmf === "1" || dtmf === "2" || dtmf === "3" || dtmf === "4") {
    await setDtmfUser("dtmf4", getPerson);
    let userChoice = "";
    switch (dtmf) {
      case "1":
        userChoice = "less than 2 months";
        break;
      case "2":
        userChoice = "less than 6 months";
        break;
      case "3":
        userChoice = "less than 1 year";
        break;
      case "4":
        userChoice = "more than 1 year";
        break;
      default:
        break;
    }
    await setUserChoice(userChoice, getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506278576newSettlementOptionhindiwavc6113660-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf3", getPerson);
    console.log("FinancialLoss Worked");
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506235940newFinancialLosshindiwavaca70470-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "8") {
    await setDtmfUser("dtmf2", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1711539074859financialconstraints6Optionsayushwav85479b10-ec2d-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf42", getPerson);
    return getDtmf3("2", getPerson);
  }
}

export async function getDtmf5(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf51", getPerson);
    // await setDtmfUser("dtmf1", getPerson);
    await setUserChoice("Settlement: Yes", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506299296newFamilyIncomehindiwavd26a8740-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //family Income Options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "2") {
    await setDtmfUser("dtmf52", getPerson);
    await setUserChoice("Settlement: No", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506310804newSettlementOptionNohindiwavd9465b70-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //if user selected no option in the settlement options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "3") {
    await setDtmfUser("dtmf5", getPerson);
    await setUserChoice("Settlement: Unable to pay", getPerson);
    return [
      {
        action: "play",
        file_name:
          "1711539431292unableToPayResponseayushwav59baa900-ec2e-11ee-8950-d73e6adcd329_piopiy.wav", //play if user is unable to pay the amount of the loan
      },
      {
        action: "play",
        file_name:
          "1713582161926enterAadhaarhindiwav74115eb0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name:
          "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "input",
        max_digit: 12,
        max_retry: 2,
        timeout: 60,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf3", getPerson);
    console.log("FinancialLoss Worked");
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506235940newFinancialLosshindiwavaca70470-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf3", getPerson);
    return getDtmf2("1", getPerson);
  }
}

export async function getDtmf5Sec1(dtmf, getPerson) {
  if (dtmf >= "1" && dtmf <= "7") {
    await setDtmfUser("dtmf53", getPerson);
    let userChoice = "";
    switch (dtmf) {
      case "1":
        userChoice = "No income";
        break;
      case "2":
        userChoice = "10000";
        break;
      case "3":
        userChoice = "20000";
        break;
      case "4":
        userChoice = "40000";
        break;
      case "5":
        userChoice = "60000";
        break;
      case "6":
        userChoice = "less than 100000";
        break;
      case "7":
        userChoice = "more than 100000";
        break;
      default:
        break;
    }
    await setUserChoice(userChoice, getPerson);

    return [
      {
        action: "play_get_input",
        file_name:
          "1713506318270newOneTimeSettlementhindiwavddba0940-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlement in one-time
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf4", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506278576newSettlementOptionhindiwavc6113660-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf51", getPerson);
    return getDtmf5("1", getPerson);
  }
}

export async function getDtmf5Sec2(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf5", getPerson);
    await setUserChoice("Want 3 equal installments", getPerson);
    // await setChoice("update")
    return [
      {
        action: "play",
        file_name:
          "1713582161926enterAadhaarhindiwav74115eb0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name:
          "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "input",
        max_digit: 12,
        max_retry: 2,
        timeout: 60,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "2") {
    await setDtmfUser("dtmf5", getPerson);
    await setUserChoice("Don't want 3 equal installment", getPerson);
    return [
      {
        action: "play",
        file_name:
          "1713582161926enterAadhaarhindiwav74115eb0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name:
          "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "input",
        max_digit: 12,
        max_retry: 2,
        timeout: 60,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf4", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506278576newSettlementOptionhindiwavc6113660-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf52", getPerson);
    return getDtmf5("2", getPerson);
  }
}

export async function getDtmf5Sec3(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf5", getPerson);
    await setUserChoice("One-Time", getPerson);
    return [
      {
        action: "play",
        file_name:
          "1713582161926enterAadhaarhindiwav74115eb0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name:
          "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "input",
        max_digit: 12,
        max_retry: 2,
        timeout: 60,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "2") {
    await setDtmfUser("dtmf5", getPerson);
    await setUserChoice("No One-Time", getPerson);
    // await setChoice("update")
    return [
      {
        action: "play",
        file_name:
          "1713582161926enterAadhaarhindiwav74115eb0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name:
          "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "input",
        max_digit: 12,
        max_retry: 2,
        timeout: 60,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf4", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713506278576newSettlementOptionhindiwavc6113660-fe11-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf51", getPerson);
    return getDtmf5("1", getPerson);
  }
}

export async function getDtmf6(dtmf, getPerson) {
  console.log("DTMF OF getDtmf6", dtmf, getPerson)
  if (dtmf.length <= 12 && parseInt(dtmf) >= 12 && parseInt(dtmf) <= 999999999999) {

    // const db = client.db(dbName);
    // const collection = db.collection("aadharDetailsCalling");
    // const updated = await collection.findOne({ personId: getPerson._id })
    // console.log("Updated : ")

    try {
      const updateData = await getAadhaarRefIDDetail(dtmf, getPerson);
      console.log("UpadtedData :", updateData)
      if (updateData && updateData?.client_id) {
        await setDtmfUser("dtmf6", getPerson);
        await setUserChoice("Entered Aadhaar Number", getPerson);
        return [
          {
            action: "play",
            file_name:
              "1713159755934EnterOTPhindiwavf679c210-faea-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "play",
            file_name:
              "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "input",
            max_digit: 6,
            max_retry: 2,
            timeout: 600,
            action_url: actionUrl,
          },
        ];
      } else {
        await deleteAadhaarDocument(dtmf);
        await setDtmfUser("dtmf5", getPerson);
        await setUserChoice("invalid aadhaar input", getPerson);
        console.log("Aadhaar Document RefID not found.");
        return [
          {
            action: "play",
            file_name:
              "1713677102152inputhindiwav80d96d80-ff9f-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "play",
            file_name:
              "1713582161926enterAadhaarhindiwav74115eb0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "play",
            file_name:
              "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "input",
            max_digit: 12,
            max_retry: 2,
            timeout: 60,
            action_url: actionUrl,
          },
        ];
      }
    } catch (error) {
      console.error("Error in getDtmf6:", error);
      throw error;
    }
  }
}

export async function getDtmfLast(dtmf, getPerson) {
  if (dtmf.length <= 6 && parseInt(dtmf) >= 6 && parseInt(dtmf) <= 999999) {
    await setDtmfUser("dtmf7", getPerson);
    await setUserChoice("Entered OTP/Verified/Not-Verified", getPerson);
    try {
      const aadhaarDocument = await getAdhaarDetailsOtpUpdate(dtmf,getPerson);
      if (aadhaarDocument) {
        console.log("Aadhaar Document:", aadhaarDocument);
        if (aadhaarDocument.response?.status == "success_aadhaar" || aadhaarDocument.response?.message == "Aadhaar Card Exists") {
          return [
            {
              action: "play",
              file_name:
                "1711540258074afterAadhaarVerificationayushwav468a5400-ec30-11ee-8950-d73e6adcd329_piopiy.wav",
            },
          ];
        } else {
          return [
            {
              action: "play",
              file_name:
                "1713677102152inputhindiwav80d96d80-ff9f-11ee-9a4e-ddacf980bad8_piopiy.wav",
            },
          ];
        }
      } else {
        console.error("Aadhaar document not found.");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
}
