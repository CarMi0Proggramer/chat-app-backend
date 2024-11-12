import { Router } from "express";
import { grantAccess } from "../middlewares/grant_access";
import { UserController } from "../controllers/users";

export const usersRouter = Router();
usersRouter.use(grantAccess);

usersRouter.get("/", UserController.get);
usersRouter.get("/lastConnectionTime", UserController.getLastConnectionTime);
