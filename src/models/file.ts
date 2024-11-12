import { AppDataSource } from "../data-source";
import { File } from "../entities/File.entity";
import { Message } from "../entities/Message";

type CreateFileOptions = {
    originalName: string;
    size: number;
    path: string;
    message?: Message;
};

export class FileModel {
    static async create(data: CreateFileOptions) {
        const file = await AppDataSource.getRepository(File).save(data);
        return file;
    }

    static async getById(id: string) {
        const file = await AppDataSource.getRepository(File).findOneBy({
            id,
        });
        return file;
    }

    static async delete(id: string) {
        const result = await AppDataSource.getRepository(File).delete(id);
        return result;
    }
}
