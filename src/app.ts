import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { corsMiddleware } from "./middlewares/cors";
import { AppDataSource } from "./data-source";
import { authRouter } from "./routes/auth";
import { verifyToken } from "./middlewares/verify_token";
import { usersRouter } from "./routes/users";
import SocketManager from "./managers/socket";
import { messagesRouter } from "./routes/messages";
import { filesRouter } from "./routes/files";

dotenv.config();
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {
        maxDisconnectionDuration: 1000 * 60,
    },
    cors: {
        origin: "https://programmers-chat.onrender.com",
        credentials: true,
    },
});

export const socketManager = SocketManager(io);

AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Error during initialization: ", err));

app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware);
app.use(verifyToken);

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);
app.use("/files", filesRouter);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
