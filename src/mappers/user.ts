import { User } from "../entities/User";

export class UserMapper {
    static map(user: User) {
        const { id, password, ...data } = user;
        return data;
    }
}
