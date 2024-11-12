import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class UserModel {
    static async create(name: string, email: string, password: string) {
        const user = await AppDataSource.getRepository(User).save({
            name,
            email,
            password,
        });
        return user;
    }

    static async getByEmail(email: string) {
        const user = await AppDataSource.getRepository(User).findOne({
            where: { email },
            relations: { sentMessages: true },
        });
        return user;
    }

    static async setDisconnected(id: string) {
        AppDataSource.getRepository(User).update(id, {
            status: 0,
        });
    }

    static async setConnected(id: string) {
        AppDataSource.getRepository(User).update(id, {
            status: 1,
        });
    }

    static async setLastConnectionTime(id: string) {
        AppDataSource.getRepository(User).update(id, {
            lastConnectionTime: () => "CURRENT_TIMESTAMP",
        });
    }
}
