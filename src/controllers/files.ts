import type { Request, Response } from "express";
import { FileModel } from "../models/file";
import { MessageModel } from "../models/message";
import { UserModel } from "../models/user";
import { ChatRoomModel } from "../models/chatroom";
import { FileMapper } from "../mappers/file";

export class FileController {
    static async create(req: Request, res: Response) {
        try {
            const file = req.file;
            if (!file) {
                res.status(400).json({ message: "No file uploaded" });
                return;
            }

            if (!req.body.roomName) {
                res.status(400).json({ message: "Chat room is required" });
                return;
            }

            if (!req.body.userEmail) {
                res.status(400).json({ message: "User email is required" });
                return;
            }

            const newFile = await FileModel.create({
                originalName: file.originalname,
                path: file.path,
                size: file.size,
            });

            const user = await UserModel.getByEmail(req.body.userEmail);
            const chatRoom = await ChatRoomModel.getByName(req.body.roomName);
            const message = await MessageModel.create(
                "",
                user,
                chatRoom,
                newFile
            );

            res.json({ ...message, file: FileMapper.map(newFile) });
        } catch {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async download(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const file = await FileModel.getById(id);

            if (!file) {
                res.status(404).json({ message: "File not found" });
                return;
            }

            res.sendFile(
                file.path,
                {
                    headers: {
                        "Content-Disposition": `attachment; filename="${file.originalName}"`,
                    },
                },
                (err) => {
                    if (err) {
                        res.status(404).json({ message: "File not found" });
                    }
                }
            );
        } catch {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
