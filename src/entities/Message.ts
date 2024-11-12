import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Relation,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./User";
import { ChatRoom } from "./ChatRoom";
import { File } from "./File.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    content: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @OneToOne(() => File)
    @JoinColumn()
    file: Relation<File>;

    @ManyToOne(() => User, (user) => user.sentMessages)
    user: Relation<User>;

    @ManyToOne(() => ChatRoom, (chatroom) => chatroom.messages)
    chatRoom: Relation<ChatRoom>;
}
