import type { Request, Response, NextFunction } from "express";

export function grantAccess(req: Request, res: Response, next: NextFunction) {
    if (!req.body.session.user) {
        res.status(403).json({ message: "Access unauthorized" });
        return;
    }

    next();
}
