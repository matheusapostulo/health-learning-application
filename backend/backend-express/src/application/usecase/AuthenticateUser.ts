import DatabaseConnection from "../ports/database/DatabaseConnection";
import EncryptService from "../ports/EncryptService";
import JwtService from "../ports/JwtService";
import UserRepository from "../repository/UserRepository";

export default class AuthenticateUser {

    constructor(
        readonly connection: DatabaseConnection, 
        readonly encryptService: EncryptService, 
        readonly userRepository: UserRepository, 
        readonly jwtService: JwtService) {
    }

    async execute(input: InputAuthenticateUser): Promise<OutputAuthenticateUser> {
        try {
            // Checking if the user exists and obtaining the user
            const user = await this.userRepository.getUser(input.email);
            // Checking if the password is correct
            await user.validatePassword(input.password, this.encryptService);
            // If the password is correct, we're gonna generate a token
            const token = await this.jwtService.generateToken({ email: user.getEmail() });
            return {
                token: token,
            }
        } catch (error) {
            // Futhermore we'll see how to handle errors in a better way
            console.error("Authentication error:", error);
            throw error;
        }
        
    }
}

interface InputAuthenticateUser {
    email: string,
    password: string,
}

interface OutputAuthenticateUser {
    token: string;
}