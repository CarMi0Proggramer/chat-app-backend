import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    originalName: string;

    @Column()
    path: string;

    @Column()
    size: number;
}
