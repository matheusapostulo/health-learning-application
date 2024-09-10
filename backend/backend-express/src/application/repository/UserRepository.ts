import User from "../../domain/User";

export default interface UserRepository {
    saveUser(user: User): Promise<void>;
    getUser(userEmail: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    updateUser(user: User): Promise<void>;
}