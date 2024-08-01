import User from "../../domain/User";
import UserRepository from "../repository/UserRepository";

export default class CreateUser {

    constructor(readonly userRepository: UserRepository) {
    }

    async execute(input: InputCreateUser): Promise<OutputCreateUser> {
        const user = User.create(input.name, input.lastName, input.email, input.password);
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