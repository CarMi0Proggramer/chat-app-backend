import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Message } from "./entities/Message";
import { ChatRoom } from "./entities/ChatRoom";
import { File } from "./entities/File.entity";
import { envs } from "./config/envs";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.db.host,
    port: envs.db.port,
    username: envs.db.user,
    password: envs.db.password,
    database: envs.db.name,
    entities: [User, Message, ChatRoom, File],
    migrations: [],
    logging: true,
    synchronize: true,
});
