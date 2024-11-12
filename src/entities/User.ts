import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Relation,
    CreateDateColumn,
    AfterUpdate,
} from "typeorm";
import { Message } from "./Message";

enum Status {
    CONNECTED = 1,
    DISCONNECTED = 0,
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    lastConnectionTime: Date;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.DISCONNECTED,
    })
    status: Status;

    @Column({ nullable: true })
    urlImg: string;

    @OneToMany(() => Message, (message) => message.user)
    sentMessages: Relation<Message[]>;
}
