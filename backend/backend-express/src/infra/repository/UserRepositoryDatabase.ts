import UserRepository from "../../application/repository/UserRepository";
import User from "../../domain/User";

export default class UserRepositoryDatabase implements UserRepository {
    constructor(readonly connection: any) { 
    }

    async saveUser(user: User): Promise<void> {
        await this.connection.create(user);
    }

    async getUser(userId: string): Promise<User> {
        // Checking if the user exists
        const user = await this.connection.findUnique(userId, 'user');
        // If the user doesn't exist, return user that is equal null
        if(!user){
            return user;
        }
        return new User(user.id, user.name, user.lastName, user.email, user.password, user.favoritedModels, user.predictions);
    }

    async updateUser(user: User): Promise<void> {
        await this.connection.updateUser(user);
    }
}