import User from "../../domain/User";

export default interface UserRepository {
    saveUser(user: User): Promise<void>;
}