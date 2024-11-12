import { AppDataSource } from "../data-source";
import { ChatRoom } from "../entities/ChatRoom";

export class ChatRoomModel {
    static async getByName(name: string) {
        const chatRoom = await AppDataSource.getRepository(ChatRoom).findOneBy({
            name,
        });
        return chatRoom;
    }
}
