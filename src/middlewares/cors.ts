import cors from "cors";

const ACCEPTED_ORIGINS = ["http://localhost:5173"];

export const corsMiddleware = cors({
    origin: (origin, callback) => {
        if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        throw new Error("Not allowed by cors");
    },
    credentials: true,
});
