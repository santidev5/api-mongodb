import express from "express";
import path from "node:path";
import { connectDatabase } from "./database.js"; // <- conexion a base de datos
import { ObjectId } from "mongodb";

const app = express();

// Funcion para obtener colecciones
async function getCollection(name) {
    const db = await connectDatabase(); // <- creamos conexion con la db
    const collection = await db.collection(name); //<- obtener una coleccion de nuestra db
    return await collection;
}

// Middleware para especificar ruta donde express buscará recursos estaticos
app.use(express.static(path.join(process.cwd(), "build")));

app.get("/", async (req, res) => {
    res.sendFile(path.join(process.cwd(), "build", "index.html"));
});

app.get("/api/movies", async (req, res) => {
    const collection = await getCollection("movies");
    const movies = await collection.find().limit(10).toArray();
    res.json(movies);
});

app.delete("/:id", async (req, res) => {
    const { id } = req.params; //<- destructuramos porque el id viene como objeto
    const collection = await getCollection("movies");
    const { deletedCount } = await collection.deleteOne({
        _id: new ObjectId(id),
    });
    if (deletedCount !== 1) {
        return res.json({ msg: "movie could'n be deleted" });
    }
    // <- instanciamos un nuevo ObjectId con el id
    res.json({ deletedCount });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log("Server listening on http://localhost:3000");
});
