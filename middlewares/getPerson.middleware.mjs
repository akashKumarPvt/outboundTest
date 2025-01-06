import { client, dbName } from "../db/index.db.js"

async function getPerson(req, res, next) {
    let person = {};
    console.log("Middleware ", req.body);
    if (req.body.action !== "inbound") {
        if (req.body.from == 918031406694 || req.body.from == 918031406693) {
            let phone = req.body.to;
            let type = JSON.parse(req.body.extra_params);
            if (type.type == "outbound") {
                try {
                    const startingTimestamp = type.startingTimestamp;
                    const db = client.db(dbName);
                    const collection = db.collection("ayushCallingData");
                    person = await collection.findOne({
                        $or: [{ phone: +phone }, { phone: phone + "" }],
                    });
                    await collection.updateOne(
                        {
                            $or: [{ phone: +phone }, { phone: phone + "" }],
                        },
                        {
                            $set: {
                                setDtmf: "dtmf1",
                                startingTimestamp: startingTimestamp
                            }
                        }
                    );

                    if (!person) {
                        console.error("Person not found");
                        return res.status(404).send("Person not found");
                    }
                    else {
                        req.body.person = person;
                    }
                } catch (error) {
                    console.error("Error fetching person data:", error);
                    return res.status(500).send("Internal Server Error");
                }
            }
        } else if (req.body.to == 918031406694 || req.body.to == 918031406693) {
            let phone = req.body.from;
            try {
                const startingTimestamp = type?.startingTimestamp||"";
                const db = client.db(dbName);
                const collection = db.collection("ayushCallingData");
                person = await collection.findOne({
                    $or: [{ phone: +phone }, { phone: phone + "" }],
                });
                await collection.updateOne(
                    {
                        $or: [{ phone: +phone }, { phone: phone + "" }],
                    },
                    { $set: { setDtmf: "dtmf1", startingTimestamp: startingTimestamp } }
                );
                if (!person) {
                    console.error("Person not found");
                    return res.status(404).send("Person not found");
                }
                else {
                    req.body.person = person;
                }
            } catch (error) {
                console.error("Error fetching person data:", error);
                return res.status(500).send("Internal Server Error");
            }
        }
    }
    next();
}

async function savePrevInfo(req, res, next) {

    if (req.body.from == 918031406694 || req.body.from == 918031406693) {
        let type = JSON.parse(req.body.extra_params);
        if (type.type == "ayushCallingData") {
            let phone = req.body.to;
            const db = client.db(dbName);
            const collection = db.collection("ayushCallingData");
            let person = await collection.findOne({
                $or: [{ phone: +phone }, { phone: phone + "" }],
            });
            const cdr = req.body;
            if (cdr.type == "cdr") {
                const result = await client.connect();
                const db = result.db(dbName);
                const collection = db.collection("ayushCallingData");
                const collection2 = db.collection("ayushCallingHistory");
                if (cdr.type == "cdr") {
                    let status = cdr.status;
                    if (person.prevInfo && person.prevInfo.status === "answered") {
                        status = "answered";
                    }
                    const updateValue = await collection.updateMany(
                        { $or: [{ phone: +phone }, { phone: phone + "" }] },
                        {
                            $set: {
                                prevInfo: {
                                    lastCall: convertTimestampToDate(cdr.time),
                                    duration: cdr.duration,
                                    status: cdr.status,
                                    out: cdr.out,
                                    api_init: cdr.api_init,
                                    callEnd: cdr.end_time,
                                    timestamp: cdr.time,
                                    startCall: cdr.start_time
                                },
                                direction: cdr.direction,
                                // setDtmf:
                                //     status === "answered" || status === "hangup"
                                //         ? "dtmf1"
                                //         : person.setDtmf,
                                setDtmf: "dtmf1",
                                language: "",
                            },
                        }
                    );

                    const updateValue2 = await collection2.insertOne({ cdr });
                }
            }
        }
    } else if (req.body.to == 918031406694 || req.body.to == 918031406693) {
        // let type = JSON.parse(req.body.extra_params);
        // if (type.type == "ayushCallingData") {
        let phone = req.body.from;
        const db = client.db(dbName);
        const collection = db.collection("ayushCallingData");
        let person = await collection.findOne({
            $or: [{ phone: +phone }, { phone: phone + "" }],
        });
        const cdr = req.body;
        if (cdr.type == "cdr") {
            const result = await client.connect();
            const db = result.db(dbName);
            const collection = db.collection("ayushCallingData");
            const collection2 = db.collection("ayushCallingHistory");
            if (cdr.type == "cdr") {
                let status = cdr.status;
                if (person.prevInfo && person.prevInfo.status === "answered") {
                    status = "answered";
                }
                const updateValue = await collection.updateMany(
                    { $or: [{ phone: +phone }, { phone: phone + "" }] },
                    {
                        $set: {
                            prevInfo: {
                                lastCall: convertTimestampToDate(cdr.time),
                                duration: cdr.duration,
                                status: cdr.status,
                                out: cdr.out,
                                api_init: cdr.api_init,
                                callEnd: cdr.end_time,
                                timestamp: cdr.time,
                                startCall: cdr.start_time
                            },
                            direction: cdr.direction,
                            setDtmf: "dtmf1",
                            language: "",
                        },
                    }
                );

                const updateValue2 = await collection2.insertOne({ cdr });
            }
        }
        // }
    }
    next();
}

function convertTimestampToDate(timestamp) {
    var date = new Date(timestamp);
    var options = { month: "numeric", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
}

export { getPerson, savePrevInfo };
