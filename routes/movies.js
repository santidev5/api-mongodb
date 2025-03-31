import { Router } from "express";
import { MovieController } from "../controllers/Movie.js";

export const moviesRouter = Router();

moviesRouter.get("/", MovieController.index);

moviesRouter.delete("/:id", MovieController.delete);

moviesRouter.patch("/:id", MovieController.update);
