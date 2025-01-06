import { setDtmfUser } from "../index.js";
// import { getPerson } from "../middlewares/getPerson.middleware.js";
import { actionUrl } from "../index.js";
import { setUserChoice } from "../utilities/choices.js";

import { getAadhaarRefIDDetail } from "../index.js";
import { getAdhaarDetailsOtpUpdate } from "../index.js";
import { deleteAadhaarDocument } from "../index.js";

export async function getGujDtmf(dtmf, getPerson) {
  if (dtmf === "6") {
    await setDtmfUser("dtmf2", getPerson);
    await setUserChoice("gujarati", getPerson);
    const loanAmtSpoken = toSpokenNumber(getPerson?.loanAmt || 0);
    const pendingAmtSpoken = toSpokenNumber(getPerson?.pendingAmt || 0);
    return [
      // {
      //   action: "play",
      //   file_name: "1713581983362aadhargujaratiwav09a28360-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav", //adhaarcard
      // },
      // {
      //   action: "speak",
      //   text: `${getPerson.organization}`
      // },
      // {
      //   action: "play",
      //   file_name: "1712901495278accorrdingTogujaratiwava72091e0-f891-11ee-9a4e-ddacf980bad8_piopiy.wav"
      // },
      // {
      //   action: "play",
      //   file_name: "1712901525547initialAmountgujaratiwavb92b40b0-f891-11ee-9a4e-ddacf980bad8_piopiy.wav"
      // },
      // {
      //   action: "speak",
      //   text: `Rupees...... ${loanAmtSpoken}... `
      // },
      // {
      //   action: "play",
      //   file_name: "1712901542409pendingAmountgujaratiwavc3380980-f891-11ee-9a4e-ddacf980bad8_piopiy.wav"
      // },
      // {
      //   action: "speak",
      //   text: `Rupees...... ${pendingAmtSpoken}... `
      // },
      {
        action: "play_get_input",
        file_name:
          "1712387246032financialconstraints6Optionsgwav52b0de00-f3e4-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf1, getPerson")
    return getGujDtmf("6" || "")
  }
}

export async function getGujDtmf2(dtmf, getPerson) {
  if (dtmf == "1") {
    await setDtmfUser("dtmf3", getPerson);
    await setUserChoice("Financial Loss", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531742971newFinancialLossgujaratiwav10076100-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
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
          "1713531771028newSettlementOptiongujaratiwav20c06280-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf2", getPerson)
    return getGujDtmf2("1")
  }
}

export async function getGujDtmf3(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf41", getPerson);
    await setUserChoice("business loss", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531750758newBussinessLossgujaratiwav14ac09e0-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //bussinessLossOptions
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
          "1713531760869newJobLossgujaratiwav1ab1a250-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //joblossOptions
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
          "1713531771028newSettlementOptiongujaratiwav20c06280-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
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
          "1712387246032financialconstraints6Optionsgwav52b0de00-f3e4-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf3", getPerson)
    return getGujDtmf2("1" || "0")
  }
}

export async function getGujDtmf4Sec1(dtmf, getPerson) {
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
          "1713531771028newSettlementOptiongujaratiwav20c06280-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
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
          "1713531742971newFinancialLossgujaratiwav10076100-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
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
          "1712387246032financialconstraints6Optionsgwav52b0de00-f3e4-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf41", getPerson)
    return getGujDtmf3("1")
  }
}

export async function getGujDtmf4Sec2(dtmf, getPerson) {
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
          "1713531771028newSettlementOptiongujaratiwav20c06280-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
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
          "1713531742971newFinancialLossgujaratiwav10076100-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
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
          "1712387246032financialconstraints6Optionsgwav52b0de00-f3e4-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf42", getPerson)
    return getGujDtmf3("2")
  }
}

export async function getGujDtmf5(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf51", getPerson)
    // await setDtmfUser("dtmf1", getPerson);
    await setUserChoice("Settlement: Yes", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531779714newFamilyIncomegujaratiwav25ee5fa0-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //family Income Options
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
          "1712387283566settlementNoOptionsgwav690ff2d0-f3e4-11ee-8950-d73e6adcd329_piopiy.wav", //if user selected no option in the settlement options
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
          "1712387289405unableToPayResponsegwav6c8bfa30-f3e4-11ee-8950-d73e6adcd329_piopiy.wav", //play if user is unable to pay the amount of the loan
      },
      {
        action: "play",
        file_name: "1713582170462enterAadhaargujaratiwav7927b520-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf3", getPerson);
    console.log("FinancialLoss Worked")
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531742971newFinancialLossgujaratiwav10076100-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  }
  else {
    await setDtmfUser("dtmf3", getPerson)
    return getGujDtmf2("1")
  }
}

export async function getGujDtmf5Sec1(dtmf, getPerson) {
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
          "1713531811287newOneTimeSettlementgujaratiwav38bfe0e0-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlement in one-time
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
          "1713531771028newSettlementOptiongujaratiwav20c06280-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf51", getPerson)
    return getGujDtmf5("1")
  }
}

export async function getGujDtmf5Sec2(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf5", getPerson)
    await setUserChoice("Want 3 equal installments", getPerson)
    return [
      {
        action: "play",
        file_name: "1713582170462enterAadhaargujaratiwav7927b520-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
    await setUserChoice("Don't want 3 equal installment", getPerson)
    return [
      {
        action: "play",
        file_name: "1713582170462enterAadhaargujaratiwav7927b520-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "input",
        timeout: 60,
        max_digit: 12,
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
          "1713531771028newSettlementOptiongujaratiwav20c06280-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf52", getPerson)
    return getGujDtmf5("2")
  }
}

export async function getGujDtmf5Sec3(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf5", getPerson)
    await setUserChoice("One-Time", getPerson)
    return [
      {
        action: "play",
        file_name: "1713582170462enterAadhaargujaratiwav7927b520-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
        file_name: "1713582170462enterAadhaargujaratiwav7927b520-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
          "1713531771028newSettlementOptiongujaratiwav20c06280-fe4d-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf51", getPerson)
    return getGujDtmf5("1")
  }
}

export async function getGujDtmf6(dtmf, getPerson) {
  if (dtmf.length <= 12 && parseInt(dtmf) >= 12 && parseInt(dtmf) <= 999999999999) {
    await setDtmfUser("dtmf6", getPerson)
    await setUserChoice("Entered Aadhaar Number", getPerson)
    try {
      const updateData = await getAadhaarRefIDDetail(dtmf, getPerson);
      console.log("UpadtedData :", updateData)
      if (updateData && updateData?.client_id) {
        await setDtmfUser("dtmf6", getPerson);
        await setUserChoice("Entered Aadhaar Number", getPerson);
        return [
          {
            action: "play",
            file_name: "1713159800624EnterOTPgujaratiwav111c7400-faeb-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "play",
            file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "input",
            max_digit: 6,
            max_retry: 2,
            timeout: 60,
            action_url: actionUrl
          }
        ]
      } else {
        await deleteAadhaarDocument(dtmf);
        await setDtmfUser("dtmf5", getPerson);
        await setUserChoice("invalid aadhaar input", getPerson);
        console.log("Aadhaar Document RefID not found.");
        return [
          {
            action: "play",
            file_name:
              "1712908468214inputgujaratiwave3522a60-f8a1-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "play",
            file_name: "1713582170462enterAadhaargujaratiwav7927b520-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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

export async function getGujDtmfLast(dtmf, getPerson) {
  if (dtmf.length <= 6 && parseInt(dtmf) >= 6 && parseInt(dtmf) <= 999999) {
    await setDtmfUser("dtmf7", getPerson);
    await setUserChoice("Entered OTP/Verified/Not-Verified", getPerson);
    try {
      const aadhaarDocument = await getAdhaarDetailsOtpUpdate(dtmf, getPerson);
      if (aadhaarDocument) {
        if (aadhaarDocument.response?.status == "VALID" || aadhaarDocument.response?.message == "Aadhaar Card Exists") {
          return [
            {
              action: "play",
              file_name: "1712387303913afterAadhaarVerificationgwav7530a780-f3e4-11ee-8950-d73e6adcd329_piopiy.wav"
            }
          ]
        } else {
          return [
            {
              action: "play",
              file_name:
                "1712908468214inputgujaratiwave3522a60-f8a1-11ee-9a4e-ddacf980bad8_piopiy.wav",
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