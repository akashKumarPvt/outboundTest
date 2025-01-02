import { setDtmfUser } from "../index.js";
// import { person } from "../middlewares/getPerson.middleware.js";
import { actionUrl } from "../index.js";
import { setUserChoice } from "../utilities/choices.js";

import { getAadhaarRefIDDetail } from "../index.js";
import { getAdhaarDetailsOtpUpdate } from "../index.js";
import { deleteAadhaarDocument } from "../index.js";
import numberToWords from "number-to-words";
 // not completed due to unavailibility of voices 
// export async function getEngDtmf(dtmf) {
//   if (dtmf === "0") {
//     await setDtmfUser("dtmf1", person1);
//     await setUserChoice("english", person1);
//     const languageChoice = person?.language || "english";
//     const loanAmtSpoken = toSpokenNumber(person?.loanAmt || 0, languageChoice);
//     const pendingAmtSpoken = toSpokenNumber(person?.pendingAmt || 0, languageChoice);
//     return [
//       {
//         action: "play",
//         file_name: "1713581961476aadharenglishwavfc97bcd0-fec1-11ee-9a4e-ddacf980bad8_piopiy.wav", //adhaarcard
//       },
//       ...loanAmtSpoken,
//       ...pendingAmtSpoken,
//     ];
//   } else {
//     await setDtmfUser("dtmf1", person1)
//     return getEngDtmf("0")
//   }
// }


export async function getEngDtmf(dtmf, person1) {
  if (dtmf === "0") {
    await setDtmfUser("dtmf2", person1);
    await setUserChoice("english", person1);
    
    // const loanAmtSpoken = toSpokenNumber(person?.loanAmt || 0);
    // const pendingAmtSpoken = toSpokenNumber(person?.pendingAmt || 0);
    const loanAmtStr=numberToWords.toWords(+person1.loanAmt).split(" ").join(".....");
    const pendingAmtStr=numberToWords.toWords(+person1.pendingAmt).split(" ").join(".....");
    const organizationStr=person1.organization.split(" ").join(".....");
    return [
      {
        action: "play",
        file_name: "1713581961476aadharenglishwavfc97bcd0-fec1-11ee-9a4e-ddacf980bad8_piopiy.wav", //valid
      },
      {
        action: "play",
        file_name: "1713581961476aadharenglishwavfc97bcd0-fec1-11ee-9a4e-ddacf980bad8_piopiy.wav", //adhaarcard
      },
      {
        action: "play",
        file_name: "1712901384000accordinfengwav64cda850-f891-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "speak",
        text: `${organizationStr}`
      },
      {
        action: "play",
        file_name: "1712901395350initialAmountengwav6b909d50-f891-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "speak",
        text: `Rupees...... ${loanAmtStr}... only`
      },
      {
        action: "play",
        file_name: "1712901420980pendingAmountengwav7ad83480-f891-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "speak",
        text: `Rupees...... ${pendingAmtStr}... only`
      },
      {
        action: "play_get_input",
        file_name:
          "1712208538550financialconstraints6Optionsenglishwav3cbc10c0-f244-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf1", person1)
    return getEngDtmf("0")
  }
}


export async function getEngDtmf2(dtmf, person1) {
  if (dtmf == "1") {
    await setDtmfUser("dtmf3", person1);
    await setUserChoice("Financial Loss", person1);
    

    return [
      {
        action: "play_get_input",
        file_name:
          "1713531096220newFinancialLossenglishwav8e895030-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf == "2" || dtmf == "3" || dtmf == "4" || dtmf == "5" || dtmf == "6") {
    await setDtmfUser("dtmf4", person1);
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
    await setUserChoice(userChoice, person1);

    return [
      {
        action: "play_get_input",
        file_name:
          "1713531128397newSettlementOptionenglishwava1b6fb30-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf2", person1)
    return getEngDtmf2("1")
  }
}

export async function getEngDtmf3(dtmf, person1) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf41", person1);
    await setUserChoice("business loss", person1)
    

    return [
      {
        action: "play_get_input",
        file_name:
          "1713531107843newBussinessLossenglishwav9576d7a0-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //bussinessLossOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "2") {
    await setDtmfUser("dtmf42", person1);
    await setUserChoice("Job loss", person1)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531118337newJobLossenglishwav9bb6e100-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //joblossOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "3" || dtmf === "4") {
    // setDtmfUser("dtmf1", person1)
    await setDtmfUser("dtmf4", person1);
    let userChoice = dtmf === "3" ? "Health Issue" : "Death of Earning Member";
    await setUserChoice(userChoice, person1);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531128397newSettlementOptionenglishwava1b6fb30-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf == "9") {
    console.log("FinancialContraints worked")
    await setDtmfUser("dtmf2", person1);
    return [
      {
        action: "play_get_input",
        file_name:
          "1712208538550financialconstraints6Optionsenglishwav3cbc10c0-f244-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf3", person1)
    return getEngDtmf2("1" || "0")
  }
}

export async function getEngDtmf4Sec1(dtmf, person1) {
  if (dtmf === "1" || dtmf === "2" || dtmf === "3") {
    await setDtmfUser("dtmf4", person1);
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
    await setUserChoice(userChoice, person1);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531128397newSettlementOptionenglishwava1b6fb30-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf3", person1);
    console.log("FinancialLoss Worked")
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531096220newFinancialLossenglishwav8e895030-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else if (dtmf === "8") {
    await setDtmfUser("dtmf2", person1);
    return [
      {
        action: "play_get_input",
        file_name:
          "1712208538550financialconstraints6Optionsenglishwav3cbc10c0-f244-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf41", person1)
    return getEngDtmf3("1")
  }
}

export async function getEngDtmf4Sec2(dtmf, person1) {
  if (dtmf === "1" || dtmf === "2" || dtmf === "3" || dtmf === "4") {
    await setDtmfUser("dtmf4", person1);
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
    await setUserChoice(userChoice, person1);
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531128397newSettlementOptionenglishwava1b6fb30-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf3", person1);
    console.log("FinancialLoss Worked")
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531096220newFinancialLossenglishwav8e895030-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else if (dtmf === "8") {
    await setDtmfUser("dtmf2", person1);
    return [
      {
        action: "play_get_input",
        file_name:
          "1712208538550financialconstraints6Optionsenglishwav3cbc10c0-f244-11ee-8950-d73e6adcd329_piopiy.wav", //financial constraints options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  } else {
    await setDtmfUser("dtmf42", person1)
    return getEngDtmf3("2")
  }
}

export async function getEngDtmf5(dtmf, person1) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf51", person1)
    // await setDtmfUser("dtmf1", person1);
    await setUserChoice("Settlement: Yes", person1)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531137310newFamilyIncomeenglishwava7072650-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //family Income Options
        max_digit: 1,
        max_retry: 2,
        action_url:
          actionUrl,
      },
    ];
  } else if (dtmf === "2") {
    await setDtmfUser("dtmf52", person1)
    // await setDtmfUser("dtmf1", person1);
    await setUserChoice("Settlement: No", person1)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531146416newSettlementOptionNoenglishwavac738c00-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //if user selected no option in the settlement options
        max_digit: 1,
        max_retry: 2,
        action_url:
          actionUrl,
      },
    ];
  } else if (dtmf === "3") {
    await setDtmfUser("dtmf5", person1)
    // await setDtmfUser("dtmf1", person1);
    await setUserChoice("Settlement: Unable to pay", person1)

    return [
      {
        action: "play",
        file_name:
          "1712208745256unableToPayResponseenglishwavb7efad60-f244-11ee-8950-d73e6adcd329_piopiy.wav", //play if user is unable to pay the amount of the loan
      },
      {
        action: "play",
        file_name: "1713582177500enterAadhaarenglishwav7d59c610-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "input",
        max_digit: 12,
        max_retry: 2,
        action_url: actionUrl
      }
    ];
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf3", person1);
    console.log("FinancialLoss Worked")
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531096220newFinancialLossenglishwav8e895030-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //financial loss 4  options
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ]
  }
  else {
    await setDtmfUser("dtmf3", person1)
    return getEngDtmf2("1")
  }
}

export async function getEngDtmf5Sec1(dtmf, person1) {
  if (dtmf >= "1" && dtmf <= "7") {
    await setDtmfUser("dtmf53", person1);
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
    await setUserChoice(userChoice, person1);

    return [
      {
        action: "play_get_input",
        file_name:
          "1713531243197newOneTimeSettlementenglishwave6246050-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlement in one-time
        max_digit: 1,
        max_retry: 2,
        action_url:
          actionUrl,
      },
    ]
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf4", person1)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531128397newSettlementOptionenglishwava1b6fb30-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf51", person1)
    return getEngDtmf5("1", person1)
  }
}

export async function getEngDtmf5Sec2(dtmf, person1) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf5", person1)
    await setUserChoice("Want 3 equal installments", person1)
    return [
      {
        action: "play",
        file_name: "1713582177500enterAadhaarenglishwav7d59c610-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
    await setDtmfUser("dtmf5", person1)
    await setUserChoice("Don't want 3 equal installment", person1)
    return [
      {
        action: "play",
        file_name: "1713582177500enterAadhaarenglishwav7d59c610-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "input",
        max_digit: 12,
        max_retry: 2,
        timeout: 45,
        action_url: actionUrl
      }
    ]
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf4", person1)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531128397newSettlementOptionenglishwava1b6fb30-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf52", person1)
    return getEngDtmf5("2", person1)
  }
}

export async function getEngDtmf5Sec3(dtmf, person1) {
  if (dtmf === "1") {
    await setDtmfUser("dtmf5", person1)
    await setUserChoice("One-Time", person1)
    return [
      {
        action: "play",
        file_name: "1713582177500enterAadhaarenglishwav7d59c610-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
    await setDtmfUser("dtmf5", person1)
    await setUserChoice("No One-Time", person1)
    return [
      {
        action: "play",
        file_name: "1713582177500enterAadhaarenglishwav7d59c610-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
      },
      {
        action: "play",
        file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav"
      },
      {
        action: "input",
        max_digit: 12,
        max_retry: 2,
        action_url: actionUrl
      }
    ]
  } else if (dtmf === "9") {
    await setDtmfUser("dtmf4", person1)
    return [
      {
        action: "play_get_input",
        file_name:
          "1713531128397newSettlementOptionenglishwava1b6fb30-fe4b-11ee-9a4e-ddacf980bad8_piopiy.wav", //settlementOptions
        max_digit: 1,
        max_retry: 2,
        action_url: actionUrl,
      },
    ];
  } else {
    await setDtmfUser("dtmf51", person1)
    return getEngDtmf5("1", person1)
  }
}

// export async function getEngDtmf6(dtmf, person1) {
//   if (dtmf.length <= 12 && parseInt(dtmf) >= 12 && parseInt(dtmf) <= 999999999999) {
//     await setDtmfUser("dtmf6", person1)
//     await setUserChoice("Entered Aadhaar Number", person1)
//     // try {
//     //   const aadhaarDocument = await getAdhaarDetailsOtpUpdate(dtmf);
//     //   if (aadhaarDocument && aadhaarDocument?.client_id) {
//     //     console.log("Aadhaar Document RefId:", aadhaarDocument);
//     //     return [
//     //       {
//     //         action: "play",
//     //         file_name: "1713159771207EnterOTPengwavff93c670-faea-11ee-9a4e-ddacf980bad8_piopiy.wav",
//     //       },
//     //       {
//     //         action: "play",
//     //         file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav",
//     //       },
//     //       {
//     //         action: "input",
//     //         max_digit: 6,
//     //         max_retry: 2,
//     //         timeout: 60,
//     //         action_url: actionUrl
//     //       }
//     //     ]
//     //   } else {
//     //     await setDtmfUser("dtmf5")
//     //     await setUserChoice("invalid aadhaar input", person1)
//     //     console.log("Aadhaar Document RefID not found.");
//     //     return [
//     //       {
//     //         action: "play",
//     //         file_name: "1713582177500enterAadhaarenglishwav7d59c610-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
//     //       },
//     //       {
//     //         action: "play",
//     //         file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav"
//     //       },
//     //       {
//     //         action: "input",
//     //         max_digit: 12,
//     //         max_retry: 2,
//     //         timeout: 60,
//     //         action_url: actionUrl
//     //       }
//     //     ]
//     //   }
//     // } catch (error) {
//     //   console.log("Error:", error);
//     // }
//     return [
//       {
//         action: "play",
//         file_name: "1713159771207EnterOTPengwavff93c670-faea-11ee-9a4e-ddacf980bad8_piopiy.wav",
//       },
//       {
//         action: "play",
//         file_name: "1712659024110beepsoundwav1b0c5ad0-f65d-11ee-9a4e-ddacf980bad8_piopiy.wav",
//       },
//       {
//         action: "input",
//         max_digit: 6,
//         max_retry: 2,
//         timeout: 60,
//         action_url: actionUrl
//       }
//     ]
//   }
// }

export async function getEngDtmf6(dtmf, person1) {
  if (dtmf.length <= 12 && parseInt(dtmf) >= 12 && parseInt(dtmf) <= 999999999999) {
    await setDtmfUser("dtmf6", person1)
    await setUserChoice("Entered Aadhaar Number", person1)
    try {
      const updateData = await getAadhaarRefIDDetail(dtmf, person1);
      console.log("UpadtedData :", updateData)
      if (updateData && updateData?.client_id) {
        await setDtmfUser("dtmf6", person1);
        await setUserChoice("Entered Aadhaar Number", person1);
        return [
          {
            action: "play",
            file_name:
              "1713159771207EnterOTPengwavff93c670-faea-11ee-9a4e-ddacf980bad8_piopiy.wav",
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
            timeout: 60,
            action_url: actionUrl,
          },
        ];
      } else {
        await deleteAadhaarDocument(dtmf);
        await setDtmfUser("dtmf5", person1);
        await setUserChoice("invalid aadhaar input", person1);
        console.log("Aadhaar Document RefID not found.");
        return [
          {
            action: "play",
            file_name:
              "1712908443377inputengwavd484a530-f8a1-11ee-9a4e-ddacf980bad8_piopiy.wav",
          },
          {
            action: "play",
            file_name: "1713582177500enterAadhaarenglishwav7d59c610-fec2-11ee-9a4e-ddacf980bad8_piopiy.wav",
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

// export async function getEngDtmfLast(dtmf, person1) {
//   if (dtmf.length <= 6 && parseInt(dtmf) >= 6 && parseInt(dtmf) <= 999999) {
//     await setDtmfUser("dtmf7", person1);
//     await setUserChoice("Entered OTP", person1)
//     return [
//       {
//         action: "play",
//         file_name: "1712208807361afterAadhaarVerificationenglishwavdcf44d00-f244-11ee-8950-d73e6adcd329_piopiy.wav"
//       }
//     ]
//   }
// }

export async function getEngDtmfLast(dtmf, person1) {
  if (dtmf.length <= 6 && parseInt(dtmf) >= 6 && parseInt(dtmf) <= 999999) {
    await setDtmfUser("dtmf7", person1);
    await setUserChoice("Entered OTP/Verified/Not-Verified", person1);
    try {
      const aadhaarDocument = await getAdhaarDetailsOtpUpdate(dtmf);
      if (aadhaarDocument) {
        if (aadhaarDocument.response?.status == "VALID" || aadhaarDocument.response?.message == "Aadhaar Card Exists") {
          return [
            {
              action: "play",
              file_name: "1712208807361afterAadhaarVerificationenglishwavdcf44d00-f244-11ee-8950-d73e6adcd329_piopiy.wav"
            }
          ]
        } else {
          return [
            {
              action: "play",
              file_name:
                "1712908443377inputengwavd484a530-f8a1-11ee-9a4e-ddacf980bad8_piopiy.wav",
            },
          ]
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