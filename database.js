import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config(); // <- recibe paths, en caso de que la .env no esté en la raiz

const url = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

let db;
export async function connectDatabase() {
    if (!db) {
        try {
            // Connecet client to the server
            const client = await MongoClient.connect(url);
            // send a ping to confirm connection
            db = client.db(dbName);
        } catch (e) {
            console.error("Error al conectar", e);
        }
    }
    return db;
}
