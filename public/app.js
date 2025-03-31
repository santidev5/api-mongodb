import express, { json } from "express";
import { moviesRouter } from "../routes/movies.js";
import path from "node:path"; //<- necesario crear las rutas asi para que funcione en produccion
import { corsMiddleware } from "../middlewares/cors.js";
import { APIMoviesRouter } from "../routes/APIMovies.js";

const app = express();
app.disable("x-powered-by");
app.use(corsMiddleware());
app.use(json());

app.set("view engine", "ejs"); //<- motor devistas ejs
app.set("views", `${process.cwd()}/views`); // <- configuramos carpeta de las vistas

// Middleware para especificar ruta donde express buscará recursos estaticos
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/", moviesRouter);
app.use("/api/movies", APIMoviesRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log("Server is running"));
