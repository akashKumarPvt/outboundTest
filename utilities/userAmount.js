export function toSpokenNumber(number, language) {
    let file_url="https://privatecourtdocs.s3.ap-south-1.amazonaws.com/CallingAmountFile/"
    // Define PCM objects for each language
    const pcmObjects = {
        hindi: {
            0: {
                action: "play",
                file_url:file_url+"0%2Bhindi.wav",
            },
            1: {
                action: "play",
                file_url:file_url+"1%2Bhindi.wav",
            },
            2: {
                action: "play",
                file_url:file_url+"2%2Bhindi.wav",
            },
            3: {
                action: "play",
                file_url:file_url+"3%2Bhindi.wav",
            },
            4: {
                action: "play",
                file_url:file_url+"4%2Bhindi.wav",
            },
            5: {
                action: "play",
                file_url:file_url+"5%2Bhindi.wav",
            },
            6: {
                action: "play",
                file_url:file_url+"6%2Bhindi.wav",
            },
            7: {
                action: "play",
                file_url:file_url+"7%2Bhindi.wav",
            },
            8: {
                action: "play",
                file_url:file_url+"8%2Bhindi.wav",
            },
            9: {
                action: "play",
                file_url:file_url+"9%2Bhindi.wav",
            },
            point: {
                action: "play",
                file_url:file_url+"point%2Bhindi.wav",
            }
        },
        english: {
            0: {
                action: "play",
                file_url:file_url+"0%2Benglish.wav"
            },
            1: {
                action: "play",
                file_url:file_url+"1%2Benglish.wav"
            },
            2: {
                action: "play",
                file_url:file_url+"2%2Benglish.wav"
            },
            3: {
                action: "play",
                file_url:file_url+"3%2Benglish.wav"
            },
            4: {
                action: "play",
                file_url:file_url+"4%2Benglish.wav"
            },
            5: {
                action: "play",
                file_url:file_url+"5%2Benglish.wav"
            },
            6: {
                action: "play",
                file_url:file_url+"6%2Benglish.wav"
            },
            7: {
                action: "play",
                file_url:file_url+"7%2Benglish.wav"
            },
            8: {
                action: "play",
                file_url:file_url+"8%2Benglish.wav"
            },
            9: {
                action: "play",
                file_url:file_url+"9%2Benglish.wav"
            },
            point: {
                action: "play",
                file_url:file_url+"point%2Benglish.wav"
            }
        },
    };

    // we will select the pcmo that needs to send based on the language 
    const languagePCMObjects = pcmObjects[language] || pcmObjects['english'];

    number=+number
    // then split the number into integer and decimal parts
    const [integerPart, decimalPart] = number.toString().split('.');

    // here wwe are converting the numbers to the pcmo
    const integerPartDigits = integerPart.split('').map(digit => languagePCMObjects[digit]);
    const integerPCMObjects = [].concat(...integerPartDigits);

    // same as above
    const decimalPartDigits = decimalPart ? decimalPart.split('').map(digit => languagePCMObjects[digit]) : [];
    const decimalPCMObjects = [].concat(...decimalPartDigits);

    // pcmo for decimal
    const decimalPointPCMObject = languagePCMObjects.point;

    // then we are sending the pcmo by combining 
    return [
        ...integerPCMObjects,  //integer part 
        decimalPointPCMObject, // point
        ...decimalPCMObjects //decimal part
    ];
}
