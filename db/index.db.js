import { MongoClient } from "mongodb";

export const url = "mongodb+srv://Balram600:Balram489@serverlessinstance0.imdt2za.mongodb.net"

export const client = new MongoClient(url);
export const dbName = "usersDetails";
export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}
