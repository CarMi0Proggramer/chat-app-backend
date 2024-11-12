import { Router } from "express";
import { fileUploader } from "../config/multer";
import { FileController } from "../controllers/files";
import { grantAccess } from "../middlewares/grant_access";

export const filesRouter = Router();
filesRouter.use(grantAccess);

filesRouter.post("/", fileUploader.single("file"), FileController.create);
filesRouter.get("/download/:id", FileController.download);
