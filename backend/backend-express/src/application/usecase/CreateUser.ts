import User from "../../domain/User";
import DatabaseConnection from "../ports/database/DatabaseConnection";
import EncryptService from "../ports/EncryptService";
import UserRepository from "../repository/UserRepository";

export default class CreateUser {

    constructor(
        readonly userRepository: UserRepository, 
        readonly encryptService: EncryptService, 
        readonly connection: DatabaseConnection) {
    }

    async execute(input: InputCreateUser): Promise<OutputCreateUser> {
        const userExists = await this.connection.findUnique(input.email, 'user');
        // Should'n create a user if it already exists
        if(userExists){
            throw new Error('User already exists');
        }
        const user = await User.create(input.name, input.lastName, input.email, input.password, this.encryptService);
        await this.userRepository.saveUser(user);
        return {
            id: user.id
        }
    }
}

interface InputCreateUser {
    name: string,
    lastName: string,
    email: string,
    password: string,
}

interface OutputCreateUser {
    id: string;
}