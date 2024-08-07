import UserRepository from "../../application/repository/UserRepository";
import User from "../../domain/User";

export default class UserRepositoryDatabase implements UserRepository {
    constructor(readonly connection: any) { 
    }

    async saveUser(user: User): Promise<void> {
        await this.connection.create(user);
    }

    async getUser(userEmail: string): Promise<User> {
        // Checking if the user exists
        const user = await this.connection.findUnique(userEmail, 'user');
        // If the user doesn't exist, throw an error
        if(!user){
            throw new Error("User not found");
        }
        return new User(user.id, user.name, user.lastName, user.email, user.password, user.favoritedModels);
    }
}