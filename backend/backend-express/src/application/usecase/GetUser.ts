import { AppError } from "../errors/AppError.error";
import { Either, left, right } from "../errors/either";
import NotFoundError from "../errors/NotFound.error";
import DatabaseConnection from "../ports/database/DatabaseConnection";

export default class GetUser {
    constructor(readonly connection: DatabaseConnection) {
    }
    async execute(userId: string): Promise<ResponseGetUser> {
        try {
            const user = await this.connection.findUnique(userId, 'user');
            if(!user){
                return left(new NotFoundError(userId));
            }
            return right({
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                favoritedModels: user.favoritedModels,
            });
        } catch (error) {
            return left(new AppError.UnexpectedError());
        }
        
    }   
}

export interface OutputGetUserDto {
    id: string;
    name: string;
    lastName: string;
    email: string;
    favoritedModels: string[];
}   

export type ResponseGetUser = Either<
    AppError.UnexpectedError |
    NotFoundError
    ,
    OutputGetUserDto
>;