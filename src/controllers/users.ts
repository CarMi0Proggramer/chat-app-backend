import type { Request, Response } from "express";
import { UserModel } from "../models/user";
import { UserMapper } from "../mappers/user";
import { JWT } from "../utils/jwt";

export class UserController {
    static async get(req: Request, res: Response) {
        try {
            const email = req.body.session.user.email;
            const user = await UserModel.getByEmail(email);
            const mappedUser = UserMapper.map(user);

            const token = JWT.sign({ role: "user", email: mappedUser.email });
            res.json({ ...mappedUser, token });
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getLastConnectionTime(req: Request, res: Response) {
        try {
            const { email } = req.body.session.user;
            const user = await UserModel.getByEmail(email);
            const lastConnectionTime = user.lastConnectionTime;

            res.json({ lastConnectionTime });
        } catch {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
