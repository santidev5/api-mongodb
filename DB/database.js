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

// Funcion para obtener colecciones
export async function getCollection(name) {
    const db = await connectDatabase(); // <- creamos conexion con la db
    const collection = await db.collection(name); //<- obtener una coleccion de nuestra db
    return collection;
}
