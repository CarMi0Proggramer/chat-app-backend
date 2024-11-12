import { Router } from "express";
import { grantAccess } from "../middlewares/grant_access";
import { MessageController } from "../controllers/messages";

export const messagesRouter = Router();
messagesRouter.use(grantAccess);

messagesRouter.get("/", MessageController.getAll);
messagesRouter.get("/last", MessageController.getFromLastConnectionTime);
messagesRouter.delete("/:id", MessageController.delete);
