import { Router } from "express";
import { MovieController } from "../controllers/Movie.js";
import multer from "multer";
import path from "node:path";

export const moviesRouter = Router();

const storage = multer.diskStorage({
    destination: `${process.cwd()}/public/images`,
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000000 },
});

moviesRouter.get("/", MovieController.index);

moviesRouter.delete("/:id", MovieController.delete);

moviesRouter.patch("/:id", MovieController.update);

moviesRouter.post("/add", upload.single("image"), MovieController.create);
