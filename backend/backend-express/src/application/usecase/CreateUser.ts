import User from "../../domain/User";
import EncryptService from "../ports/EncryptService";
import UserRepository from "../repository/UserRepository";

export default class CreateUser {

    constructor(readonly userRepository: UserRepository, readonly encryptService: EncryptService) {
    }

    async execute(input: InputCreateUser): Promise<OutputCreateUser> {
        const user = await User.create(input.name, input.lastName, input.email, input.password, this.encryptService);
        await this.userRepository.saveUser(user);
        return {
            userId: user.userId
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
    userId: string;
}