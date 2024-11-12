import jwt from "jsonwebtoken";

export class JWT {
    static sign(data: object) {
        return jwt.sign(data, process.env.JWT_SECRET_KEY, {
            expiresIn: "2h",
            algorithm: "HS256",
        });
    }

    static verify(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET_KEY, {
            algorithms: ["HS256"],
        });
    }
}
