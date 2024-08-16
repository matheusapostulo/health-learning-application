import { AppError } from "../errors/AppError.error";
import { Either, left, right } from "../errors/either";
import NotFoundError from "../errors/NotFound.error";
import { UnfavoriteModelError } from "../errors/UnfavoritedModel.error";
import ModelRepository from "../repository/ModelRepository";
import TransactionRepository from "../repository/TransactionRepository";
import UserRepository from "../repository/UserRepository";

export default class UnfavoriteModel {
    
    constructor(
        readonly userRepository: UserRepository,
        readonly modelRepository: ModelRepository,
        readonly transactionRepository: TransactionRepository){
    }

    async execute(input: InputUnfavoriteModelDto): Promise<ResponseUnfavoriteModel>{
        try {
            // Obtaining the user as domain to make mutation
            const user = await this.userRepository.getUser(input.userEmail);
            if(!user) {
                return left(new NotFoundError(input.userEmail));
            }
            // Obtaining the model as domain to make mutation
            const model = await this.modelRepository.getModel(input.modelId);
            if(!model) {
                return left(new NotFoundError(input.modelId));
            }
            if(!user.getFavoriteModels().includes(model.id)){
                return left(new UnfavoriteModelError.UserFavoritesNotFoundError());
            }
             // Doing the mutation in the model
            model.removeFavorite(user.id);
            // Doing the mutation in the user
            user.removeFavoriteModel(model.id);
            // Updating the user and model with the transaction repository
            await this.transactionRepository.favoriteUnfavoriteModelTransaction(user, model);
            return right(true);
        } catch (error) {
            console.log(error);
            return left(new AppError.UnexpectedError());
        }
    }
}

export interface InputUnfavoriteModelDto{
    userEmail: string;
    modelId: string;
}

export type ResponseUnfavoriteModel = Either<
    AppError.UnexpectedError |
    NotFoundError |
    UnfavoriteModelError.UserFavoritesNotFoundError
    ,
    boolean
>;