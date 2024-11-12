import { AppDataSource } from "../data-source";
import { ChatRoom } from "../entities/ChatRoom";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import { File } from "../entities/File.entity";

export class MessageModel {
    static async create(
        content: string,
        user: User,
        chatRoom: ChatRoom,
        file?: File
    ) {
        const message = await AppDataSource.getRepository(Message).save({
            content,
            user,
            chatRoom,
            file,
        });

        return message;
    }

    static async getByChatRoom(chatRoom: ChatRoom) {
        const messages = await AppDataSource.getRepository(Message).find({
            where: {
                chatRoom,
            },
            relations: { user: true, chatRoom: true, file: true },
        });
        return messages;
    }

    static async getFrom(timestamp: Date) {
        const messages = await AppDataSource.getRepository(Message).find({
            relations: { chatRoom: true, user: true, file: true },
        });
        return messages.filter(
            (message) => message.date.valueOf() >= timestamp.valueOf()
        );
    }

    static async getById(id: string) {
        const message = await AppDataSource.getRepository(Message).findOne({
            where: { id },
            relations: { file: true },
        });
        return message;
    }

    static async delete(id: string) {
        const result = await AppDataSource.getRepository(Message).delete(id);
        return result;
    }
}
