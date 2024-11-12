import { Message } from "../entities/Message";
import { FileMapper } from "./file";
import { UserMapper } from "./user";

export class MessageMapper {
    static map(message: Message) {
        const { id, content, date, user, chatRoom, file } = message;
        const mappedUser = UserMapper.map(user);

        return {
            id,
            content,
            date,
            user: mappedUser,
            chatRoom,
            file: file ? FileMapper.map(file) : null,
        };
    }
}
