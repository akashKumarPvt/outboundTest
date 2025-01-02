import axios from 'axios';

export let caller1 = {
    appid: 2222330,
    secret: "da93f14c-a140-492c-a40e-e2f6378b61e4",
    from: 918031406694,
};

export let mJsonPara1 = {
    appid: caller1.appid,
    secret: caller1.secret,
    from: caller1.from,
    to: "",
    extra_params: { key: "value" },
    pcmo: [],
};

export async function masterCallFunction(url, jsonPara) {
    try {
        const currentTime = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
        });
        const currentHour = new Date(currentTime).getHours();
        const currentMinute = new Date(currentTime).getMinutes();
        if (
            (currentHour > 6 && currentHour < 24) ||
            (currentHour === 6 && currentMinute >= 30) ||
            (currentHour === 24 && currentMinute === 0)
        ) {
            let response = await axios.post(url, jsonPara);
            response.data.phone = jsonPara.to;
            return response.data;
        } else {
            jsonPara.to = "Time not within 9:30 AM - 7:00 PM";
            return jsonPara;
        }
    } catch (err) {
        jsonPara.to = "Error occurred";
        return jsonPara;
    }
}
