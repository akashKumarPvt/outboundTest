import { setDtmfUser } from "../index.js";
// import { getPerson } from "../middlewares/getPerson.middleware.js";
import { actionUrl } from "../index.js";
import { setUserChoice } from "../utilities/choices.js";

import { getAadhaarRefIDDetail } from "../index.js";
import { getAdhaarDetailsOtpUpdate } from "../index.js";
import { deleteAadhaarDocument } from "../index.js";
import numberToWords from "number-to-words";


export async function getTamDtmf(dtmf, getPerson) {
  if (dtmf === "5") {
    await setDtmfUser("dtmf2", getPerson);
    await setUserChoice("tamil", getPerson);
    // const loanAmtSpoken = toSpokenNumber(getPerson?.loanAmt || 0);
    // const pendingAmtSpoken = toSpokenNumber(getPerson?.pendingAmt || 0);
    const loanAmtStr=numberToWords.toWords(+getPerson.loanAmt).split(" ").join(".....");
    const pendingAmtStr=numberToWords.toWords(+getPerson.pendingAmt).split(" ").join(".....");
    const organizationStr=getPerson.organization.split(" ").join(".....");
    return [
      {
        action: "play",
        file_name: "1717663019712validtamilwavf0dc3fe0-23df-11ef-b052-99cad6a21f8f_piopiy.wav", //valid
      },
      {
        action: "play",
        file_name: "1713582051669aadhartamilwav3259f1d0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav", //adhaarcard
      },
      {
        action: "speak",
        text: `${organizationStr}`
      },
      {
        action: "play",
        file_name: "1712901690230accorrdingTotamilwav1b543080-f892-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "play",
        file_name: "1712901699900initialAmounttamilwav21178fd0-f892-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "speak",
        text: `Rupees...... ${loanAmtStr}... `
      },
      {
        action: "play",
        file_name: "1712901722924pendingAmounttamilwav2ed097c0-f892-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "speak",
        text: `Rupees...... ${pendingAmtStr}... `
      },
      {
        action: "play_get_input",
        file_name:
          "1712387080422financialconstraints6Optionstawaveffac960-f3e3-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf1", getPerson)
    return getTamDtmf("5", getPerson)
  }
}

export async function getTamDtmf2(dtmf, getPerson) {
  if (dtmf == "1") {
    await setDtmfUser("dtmf3", getPerson);
    await setUserChoice("Financial Loss", getPerson);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713532582654newFinancialLosstamilwav0484af20-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
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
          "1713532619924newSettlementOptiontamilwav1abbc990-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf2", getPerson)
    return getTamDtmf2("1", getPerson)
  }
}

export async function getTamDtmf3(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf41", getPerson);
    await setUserChoice("business loss", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713532592243newBussinessLosstamilwav0a3bb260-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //bussinessLossOptions
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
          "1713532612006newJobLosstamilwav160371a0-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //joblossOptions
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
          "1713532619924newSettlementOptiontamilwav1abbc990-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
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
          "1712387080422financialconstraints6Optionstawaveffac960-f3e3-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf3", getPerson)
    return getTamDtmf2("1", getPerson)
  }
}

export async function getTamDtmf4Sec1(dtmf, getPerson) {
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
          "1713532619924newSettlementOptiontamilwav1abbc990-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
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
          "1713532582654newFinancialLosstamilwav0484af20-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
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
          "1712387080422financialconstraints6Optionstawaveffac960-f3e3-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf41", getPerson)
    return getTamDtmf3("1", getPerson)
  }
}

export async function getTamDtmf4Sec2(dtmf, getPerson) {
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
          "1713532619924newSettlementOptiontamilwav1abbc990-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
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
          "1713532582654newFinancialLosstamilwav0484af20-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
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
          "1712387080422financialconstraints6Optionstawaveffac960-f3e3-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf42", getPerson)
    return getTamDtmf3("2", getPerson)
  }
}

export async function getTamDtmf5(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf51", getPerson)
    // await setDtmfUser("dtmf1", getPerson);
    await setUserChoice("Settlement: Yes", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713532669854newFamilyIncometamilwav387e5920-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //family Income Options
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
          "1712387119651settlementNoOptionstawav075c8120-f3e4-11ee-8950-d73e6adcd329_piopiy.wav", //if user selected no option in the settlement options
        max_digit: 1,
        max_retry: 2,
        action_url:
          actionUrl,
      },
    ];
  } else if (dtmf === "3") {
    // setDtmfUser("dtmf5", getPerson)
    await setDtmfUser("dtmf5", getPerson)
    // await setDtmfUser("dtmf1", getPerson);
    await setUserChoice("Settlement: Unable to pay", getPerson)
    return [
      {
        action: "play",
        file_name:
          "1712387126692unableToPayResponsetawav0ba638c0-f3e4-11ee-8950-d73e6adcd329_piopiy.wav", //play if user is unable to pay the amount of the loan
      },
      {
        action: "play",
        file_name: "1713582130437enterAadhaartamilwav614cfcd0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
          "1713532582654newFinancialLosstamilwav0484af20-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  }
  else {
    await setDtmfUser("dtmf3", getPerson)
    return getTamDtmf2("1", getPerson)
  }
}

export async function getTamDtmf5Sec1(dtmf, getPerson) {
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
          "1713532766263newOneTimeSettlementtamilwav71f558c0-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlement in one-time
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
          "1713532619924newSettlementOptiontamilwav1abbc990-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf51", getPerson)
    return getTamDtmf5("1", getPerson)
  }
}

export async function getTamDtmf5Sec2(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf5", getPerson)
    await setUserChoice("Want 3 equal installments", getPerson)
    return [
      {
        action: "play",
        file_name: "1713582130437enterAadhaartamilwav614cfcd0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
        file_name: "1713582130437enterAadhaartamilwav614cfcd0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf4", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713532619924newSettlementOptiontamilwav1abbc990-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf52", getPerson)
    return getTamDtmf5("2", getPerson)
  }
}

export async function getTamDtmf5Sec3(dtmf, getPerson) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf5", getPerson)
    await setUserChoice("One-Time", getPerson)
    return [
      {
        action: "play",
        file_name: "1713582130437enterAadhaartamilwav614cfcd0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
    await setUserChoice("No One-Time", getPerson)
    return [
      {
        action: "play",
        file_name: "1713582130437enterAadhaartamilwav614cfcd0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf4", getPerson)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713532619924newSettlementOptiontamilwav1abbc990-fe4f-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf51", getPerson)
    return getTamDtmf5("1", getPerson)
  }
}


export async function getTamDtmf6(dtmf, getPerson) {
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
            file_name: "1713159845166EnterOTPtamilwav2baa1750-faeb-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
              "1712908504788inputtamilwavf91eea40-f8a1-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "play",
            file_name: "1713582130437enterAadhaartamilwav614cfcd0-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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


export async function getTamDtmfLast(dtmf, getPerson) {
  if (dtmf.length <= 6 && parseInt(dtmf) >= 6 && parseInt(dtmf) <= 999999) {
    await setDtmfUser("dtmf7", getPerson);
    await setUserChoice("Entered OTP/Verified/Not-Verified", getPerson);
    try {
      const aadhaarDocument = await getAdhaarDetailsOtpUpdate(dtmf);
      if (aadhaarDocument) {
        if (aadhaarDocument.response?.status == "VALID" || aadhaarDocument.response?.message == "Aadhaar Card Exists") {
          return [
            {
              action: "play",
              file_name: "1712387206553afterAadhaarVerificationtawav3b28b280-f3e4-11ee-8950-d73e6adcd329_piopiy.wav"
            }
          ]
        } else {
          return [
            {
              action: "play",
              file_name:
                "1712908504788inputtamilwavf91eea40-f8a1-11ee-9a4e-ddacf980bad8_piopiy.wav",
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