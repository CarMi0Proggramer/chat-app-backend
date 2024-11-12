import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Message } from "./entities/Message";
import { ChatRoom } from "./entities/ChatRoom";
import { File } from "./entities/File.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "autorack.proxy.rlwy.net",
    port: 21806,
    username: "postgres",
    password: "MeGULcjydPGkBWrJPCyulkoLnbVqHqTK",
    database: "railway",
    entities: [User, Message, ChatRoom, File],
    migrations: [],
    logging: true,
    synchronize: true,
});
