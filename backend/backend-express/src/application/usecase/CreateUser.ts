import User from "../../domain/User";
import { AppError } from "../errors/AppError.error";
import { CreateUserError } from "../errors/CreateUser.error";
import { Either, left, right } from "../errors/either";
import RequiredParametersError from "../errors/RequiredParameters.error";
import DatabaseConnection from "../ports/database/DatabaseConnection";
import EncryptService from "../ports/EncryptService";
import UserRepository from "../repository/UserRepository";

export default class CreateUser {

    constructor(
        readonly userRepository: UserRepository, 
        readonly encryptService: EncryptService, 
        readonly connection: DatabaseConnection) {
    }

    async execute(input: InputCreateUserDto): Promise<ResponseCreateUser> {
        try {
            const userExists = await this.connection.findUserByEmail(input.email);
            // Should'n create a user if it already exists
            if(userExists){
                return left(new CreateUserError.UserAlreadyExistsError(input.email));
            }
            // Try to create a new user
            const userOrError = await User.create(input.name, input.lastName, input.email, input.password, this.encryptService);
            // If there is an error, return it
            if(userOrError.isLeft()){
                return left(userOrError.value);
            }
            // Save the user
            const user: User = userOrError.value;
            await this.userRepository.saveUser(user);
            // Return the user id
            return right({
                id: user.id
            });
        } catch (error) {
            console.log(error)
            return left(new AppError.UnexpectedError());
        }
        
    }
}

export interface InputCreateUserDto {
    name: string,
    lastName: string,
    email: string,
    password: string,
}

export interface OutputCreateUserDto {
    id: string;
}

export type ResponseCreateUser = Either<
    RequiredParametersError |
    CreateUserError.UserAlreadyExistsError |
    AppError.UnexpectedError
    , 
    OutputCreateUserDto
>;