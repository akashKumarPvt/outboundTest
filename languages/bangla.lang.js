import { setDtmfUser } from "../index.js";
// import { getPerson } from "../middlewares/getPerson.middleware.js";
import { actionUrl } from "../index.js";
import { setUserChoice } from "../utilities/choices.js";

import { getAadhaarRefIDDetail } from "../index.js";
import { getAdhaarDetailsOtpUpdate } from "../index.js";
import { deleteAadhaarDocument } from "../index.js";
import numberToWords from "number-to-words";

export async function getBenDtmf(dtmf, getPerson) {
  if (dtmf === "2") {
    await setDtmfUser("dtmf2", getPerson);
    await setUserChoice("bengali", getPerson);
    const loanAmtStr=numberToWords.toWords(+getPerson.loanAmt).split(" ").join(".....");
    const pendingAmtStr=numberToWords.toWords(+getPerson.pendingAmt).split(" ").join(".....");
    const organizationStr=getPerson.organization.split(" ").join(".....");
    return [
      // {
      //   action: "play",
      //   file_url: "1717662967706validbenagliwavd1dcea90-23df-11ef-b052-99cad6a21f8f_piopiy.wav", //valid
      // },
      // {
      //   action: "play",
      //   file_name: "1713581973207aadharbengaliwav039522c0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav", //adhaarcard
      // },
    
      // {
      //   action: "speak",
      //   text: `${organizationStr}`
      // },
      // {
      //   action: "play",
      //   file_name: "1712901432437accorrdingTobengaliwav81abcb50-f891-11ee-9a4e-ddacf980bad8_piopiy.wav"
      // },
      // {
      //   action: "play",
      //   file_name: "1712901452997initialAmountbengaliwav8ded0050-f891-11ee-9a4e-ddacf980bad8_piopiy.wav"
      // },
      // {
      //   action: "speak",
      //   text: `Rupees...... ${loanAmtStr}...`
      // },
      // {
      //   action: "play",
      //   file_name: "1712901466367pendingAmountbengaliwav95e5dd40-f891-11ee-9a4e-ddacf980bad8_piopiy.wav"
      // },
      // {
      //   action: "speak",
      //   text: `Rupees...... ${pendingAmtStr}...`
      // },
      {
        action: "play_get_input",
        file_name:
          "1712386829342financialconstraints6Optionsbengaliwav5a541650-f3e3-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf1", getPerson)
    return getBenDtmf("2", getPerson)
  }
}

export async function getBenDtmf2(dtmf, getPerson) {
  if (dtmf == "1") {
    await setDtmfUser("dtmf3", getPerson);
    await setUserChoice("Financial Loss", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531447684newFinancialLossbengaliwav600676b0-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf == "2" || dtmf == "3" || dtmf == "4" || dtmf == "5" || dtmf == "6") {
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
          "1713531533519newSettlementOptionbengaliwav932fd860-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf2", getPerson)
    return getBenDtmf2("1", getPerson)
  }
}

export async function getBenDtmf3(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf41", getPerson);
    await setUserChoice("business loss", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531473727newBussinessLossbengaliwav6f8c0140-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //bussinessLossOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "2") {
    await setDtmfUser("dtmf42", getPerson);
    await setUserChoice("Job loss", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531524119newJobLossbengaliwav8d950fb0-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //joblossOptions
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
          "1713531533519newSettlementOptionbengaliwav932fd860-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf == "9") {
    console.log("FinancialContraints worked")
    await setDtmfUser("dtmf2", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1712386829342financialconstraints6Optionsbengaliwav5a541650-f3e3-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf3", getPerson)
    return getBenDtmf2("1" || "0", getPerson)
  }
}

export async function getBenDtmf4Sec1(dtmf, getPerson) {
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
          "1713531533519newSettlementOptionbengaliwav932fd860-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf3", getPerson);
    console.log("FinancialLoss Worked")
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531447684newFinancialLossbengaliwav600676b0-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else if (dtmf === "8") {
    await setDtmfUser("dtmf2", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1712386829342financialconstraints6Optionsbengaliwav5a541650-f3e3-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf41", getPerson)
    return getBenDtmf3("1", getPerson)
  }
}

export async function getBenDtmf4Sec2(dtmf, getPerson) {
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
          "1713531533519newSettlementOptionbengaliwav932fd860-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf3", getPerson);
    console.log("FinancialLoss Worked")
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531447684newFinancialLossbengaliwav600676b0-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else if (dtmf === "8") {
    await setDtmfUser("dtmf2", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1712386829342financialconstraints6Optionsbengaliwav5a541650-f3e3-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf42", getPerson)
    return getBenDtmf3("2", getPerson)
  }
}

export async function getBenDtmf5(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf51", getPerson)
    // await setDtmfUser("dtmf1", getPerson);
    await setUserChoice("Settlement: Yes", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531541498newFamilyIncomebengaliwav97f06db0-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //family Income Options
        max_digit: 1,
        max_retry: 2,
        action_url:
          actionUrl,
      },
    ];
  } else if (dtmf === "2") {
    await setDtmfUser("dtmf52", getPerson)
    // await setDtmfUser("dtmf1", getPerson);
    await setUserChoice("Settlement: No", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531674840newSettlementOptionNobengaliwave76b69d0-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //if user selected no option in the settlement options
        max_digit: 1,
        max_retry: 2,
        action_url:
          actionUrl,
      },
    ];
  } else if (dtmf === "3") {
    await setDtmfUser("dtmf5", getPerson)
    // await setDtmfUser("dtmf1", getPerson);
    await setUserChoice("Settlement: Unable to pay", getPerson)
    return [
      {
        action: "play",
        file_name:
          "1712386888780unableToPayResponsebwav7dc1c240-f3e3-11ee-8950-d73e6adcd329_piopiy.wav", //play if user is unable to pay the amount of the loan
      },
      {
        action: "play",
        file_name: "1713582186415enterAadhaarbengaliwav82aa6660-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "input",
        max_digit: 12,
        max_retry: 2,
        timeout: 60,
        action_url: actionUrl
      }
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf3", getPerson);
    console.log("FinancialLoss Worked")
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531447684newFinancialLossbengaliwav600676b0-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  }
  else {
    await setDtmfUser("dtmf3", getPerson)
    return getBenDtmf2("1", getPerson)
  }
}

export async function getBenDtmf5Sec1(dtmf, getPerson) {
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
          "1713531684419newOneTimeSettlementbengaliwaved2182b0-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlement in one-time
        max_digit: 1,
        max_retry: 2,
        action_url:
          actionUrl,
      },
    ]
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf4", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531533519newSettlementOptionbengaliwav932fd860-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf51", getPerson)
    return getBenDtmf5("1", getPerson)
  }
}

export async function getBenDtmf5Sec2(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf5", getPerson)
    await setUserChoice("Want 3 equal installments", getPerson)
    return [
      {
        action: "play",
        file_name: "1713582186415enterAadhaarbengaliwav82aa6660-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "input",
        max_digit: 12,
        max_retry: 2,
        timeout: 60,
        action_url: actionUrl
      }
    ]
  } else if (dtmf === "2") {
    await setDtmfUser("dtmf5", getPerson)
    await setUserChoice("Don't want 3 equal installment", getPerson)
    return [
      {
        action: "play",
        file_name: "1713582186415enterAadhaarbengaliwav82aa6660-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "input",
        max_digit: 12,
        timeout: 60,
        max_retry: 2,
        action_url: actionUrl
      }
    ]
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf4", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531533519newSettlementOptionbengaliwav932fd860-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf52", getPerson)
    return getBenDtmf5("2", getPerson)
  }
}

export async function getBenDtmf5Sec3(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf5", getPerson)
    await setUserChoice("One-Time", getPerson)
    return [
      {
        action: "play",
        file_name: "1713582186415enterAadhaarbengaliwav82aa6660-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "input",
        max_digit: 12,
        timeout: 60,
        max_retry: 2,
        action_url: actionUrl
      }
    ]
  } else if (dtmf === "2") {
    await setDtmfUser("dtmf5", getPerson)
    await setUserChoice("No One-Time", getPerson)
    return [
      {
        action: "play",
        file_name: "1713582186415enterAadhaarbengaliwav82aa6660-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "input",
        max_digit: 12,
        timeout: 60,
        max_retry: 2,
        action_url: actionUrl
      }
    ]
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf4", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531533519newSettlementOptionbengaliwav932fd860-fe4c-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf51", getPerson)
    return getBenDtmf5("1", getPerson)
  }
}

export async function getBenDtmf6(dtmf, getPerson) {
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
              "1713159782979EnterOTPbengaliwav06983140-faeb-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "play",
            file_name:
              "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "input",
            max_digit: 6,
            max_retry: 1,
            timeout: 120,
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
              "1712908459393inputbengaliwavde10cc50-f8a1-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "play",
            file_name: "1713582186415enterAadhaarbengaliwav82aa6660-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "play",
            file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav"
          },
          {
            action: "input",
            max_digit: 12,
            max_retry: 2,
            timeout: 60,
            action_url: actionUrl
          },
        ];
      }
    } catch (error) {
      console.error("Error in getDtmf6:", error);
      throw error;
    }
  }
}

export async function getBenDtmfLast(dtmf, getPerson) {
  if (dtmf.length <= 6 && parseInt(dtmf) >= 6 && parseInt(dtmf) <= 999999) {
    await setDtmfUser("dtmf7", getPerson);
    await setUserChoice("Entered OTP/Verified/Not-Verified", getPerson);
    try {
      const aadhaarDocument = await getAdhaarDetailsOtpUpdate(dtmf,getPerson);
      if (aadhaarDocument) {
        if (aadhaarDocument.response?.status == "success_aadhaar" || aadhaarDocument.response?.message == "Aadhaar Card Exists") {
          return [
            {
              action: "play",
              file_name: "1712386906390afterAadhaarVerificationbwav883f7550-f3e3-11ee-8950-d73e6adcd329_piopiy.wav"
            }
          ]
        } else {
          return [
            {
              action: "play",
              file_name:
                "1712908459393inputbengaliwavde10cc50-f8a1-11ee-9a4e-ddacf980bad8_piopiy.wav",
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