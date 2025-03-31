import { Router } from "express";
import { APIMoviesController } from "../controllers/APIMovies.js";

export const APIMoviesRouter = Router();

APIMoviesRouter.get("/", APIMoviesController.index);
