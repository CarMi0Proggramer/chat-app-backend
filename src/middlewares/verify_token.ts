import type { Request, Response, NextFunction } from "express";
import { JWT } from "../utils/jwt";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    req.body.session = { user: null };

    try {
        const data = JWT.verify(req.cookies.access_token);
        req.body.session.user = data;
    } catch {}

    next();
}
