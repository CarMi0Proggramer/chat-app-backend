import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Message } from "./entities/Message";
import { ChatRoom } from "./entities/ChatRoom";
import { File } from "./entities/File.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "carlos",
    password: "carlos2006",
    database: "chat_db",
    entities: [User, Message, ChatRoom, File],
    migrations: [],
    logging: true,
    synchronize: true,
});
