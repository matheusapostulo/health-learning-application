import { Either, left, right } from './../errors/either';
import DatabaseConnection from "../ports/database/DatabaseConnection";
import EncryptService from "../ports/EncryptService";
import JwtService from "../ports/JwtService";
import UserRepository from "../repository/UserRepository";
import { AppError } from '../errors/AppError.error';
import { AuthenticateUserError } from '../errors/AuthenticateUser.error';
import NotFoundError from '../errors/NotFound.error';

export default class AuthenticateUser {

    constructor(
        readonly connection: DatabaseConnection, 
        readonly encryptService: EncryptService, 
        readonly userRepository: UserRepository, 
        readonly jwtService: JwtService) {
    }

    async execute(input: InputAuthenticateUserDto): Promise<ResponseAuthenticateUser> {
        try {
            // Checking if the user exists and obtaining the user
            const user = await this.userRepository.getUser(input.userId);
            if(!user){
                return left(new NotFoundError(input.userId));
            }
            // Checking if the password is correct
            const validPasswordOrError = await user.validatePassword(input.password, this.encryptService);
            if(validPasswordOrError.isLeft()){
                return left(validPasswordOrError.value);
            }
            // If the password is correct, we're gonna generate a token
            const token = await this.jwtService.generateToken({ email: user.getEmail() });
            
            return right({
                token: token,
            });
            
        } catch (error) {
            console.log(error)
            return left(new AppError.UnexpectedError());
        }     
    }
}

export interface InputAuthenticateUserDto {
    userId: string,
    password: string,
}

export interface OutputAuthenticateUserDto {
    token: string;
}

export type ResponseAuthenticateUser = Either<
    AppError.UnexpectedError |
    NotFoundError |
    AuthenticateUserError.InvalidPasswordError
    , 
    OutputAuthenticateUserDto
>;