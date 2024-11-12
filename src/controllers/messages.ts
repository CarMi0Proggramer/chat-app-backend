import { Request, Response } from "express";
import { ChatRoomModel } from "../models/chatroom";
import { MessageModel } from "../models/message";
import { MessageMapper } from "../mappers/message";
import { UserModel } from "../models/user";
import { FileModel } from "../models/file";
import fs from "node:fs";

export class MessageController {
    static async getAll(req: Request, res: Response) {
        try {
            const { roomName } = req.query;

            if (!roomName) {
                return res
                    .status(400)
                    .json({ message: "Room name should be provided" });
            }

            const chatRoom = await ChatRoomModel.getByName(roomName as string);
            const messages = await MessageModel.getByChatRoom(chatRoom);
            const mappedMessages = messages.map((message) =>
                MessageMapper.map(message)
            );

            res.json(mappedMessages);
        } catch {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getFromLastConnectionTime(req: Request, res: Response) {
        try {
            const { email } = req.body.session.user;

            const user = await UserModel.getByEmail(email);
            const messages = await MessageModel.getFrom(
                user.lastConnectionTime
            );
            const mappedMessages = messages.map((message) =>
                MessageMapper.map(message)
            );

            res.json(mappedMessages);
        } catch {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const message = await MessageModel.getById(id);
            if (!message) {
                res.status(404).json({ message: "Message not found" });
                return;
            }

            await MessageModel.delete(id);

            const attachedFile = await FileModel.getById(message.file.id);
            if (attachedFile) {
                fs.rmSync(attachedFile.path);
                await FileModel.delete(attachedFile.id);
            }

            res.json({ message: "OK" });
        } catch {
            res.json({ message: "Internal server error" });
        }
    }
}
