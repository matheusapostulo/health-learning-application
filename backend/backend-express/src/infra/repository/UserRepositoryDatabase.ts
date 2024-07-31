import UserRepository from "../../application/repository/UserRepository";
import User from "../../domain/User";

export default class UserRepositoryDatabase implements UserRepository {
    constructor(readonly connection: any) { 
    }

    async saveUser(user: User): Promise<void> {
        await this.connection.createUser(user);
    }
}