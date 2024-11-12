import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    Relation,
    Column,
} from "typeorm";
import { Message } from "./Message";

@Entity()
export class ChatRoom {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Message, (message) => message.chatRoom)
    messages: Relation<Message[]>;
}
