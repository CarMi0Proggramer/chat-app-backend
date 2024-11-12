import type { CookieOptions, Request, Response } from "express";
import bcrypt from "bcrypt";
import { validatePartialUser, validateUser } from "../schemas/user";
import { UserModel } from "../models/user";
import { UserMapper } from "../mappers/user";
import { JWT } from "../utils/jwt";

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 2000 * 60 * 60,
    sameSite: "strict",
};

export class AuthController {
    static async login(req: Request, res: Response) {
        const result = validatePartialUser(req.body);
        if (!result.success) {
            return res.status(400).json(result.data);
        }

        try {
            const user = await UserModel.getByEmail(result.data.email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isThePasswordOfTheUser = await bcrypt.compare(
                result.data.password,
                user.password
            );
            if (!isThePasswordOfTheUser) {
                return res.status(400).json({ message: "Incorrect password" });
            }

            const mappedUser = UserMapper.map(user);
            const token = JWT.sign(mappedUser);

            UserModel.setConnected(user.id);
            res.cookie("access_token", token, cookieOptions).json({
                name: mappedUser.name,
                email: mappedUser.email,
            });
        } catch {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async register(req: Request, res: Response) {
        const result = validateUser(req.body);
        if (!result.success) {
            return res.status(400).json(result.data);
        }

        try {
            const { name, email, password } = result.data;
            const userExist = await UserModel.getByEmail(email);
            if (userExist) {
                return res
                    .status(400)
                    .json({ message: "Already registered, sign in instead" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create(name, email, hashedPassword);
            const mappedUser = UserMapper.map(user);
            const token = JWT.sign(mappedUser);

            UserModel.setConnected(user.id);
            res.cookie("access_token", token, cookieOptions).json({
                name: mappedUser.name,
                email: mappedUser.email,
            });
        } catch {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async logOut(req: Request, res: Response) {
        res.clearCookie("access_token").json({ message: "Logged out" });
    }
}
