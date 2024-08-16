import { Response } from 'express';
import ModelRepository from "../repository/ModelRepository";
import TransactionRepository from "../repository/TransactionRepository";
import UserRepository from "../repository/UserRepository";
import { Either, left, right } from '../errors/either';
import { AppError } from '../errors/AppError.error';
import { FavoriteModelError } from '../errors/FavoriteModel.error';
import NotFoundError from '../errors/NotFound.error';

export default class FavoriteModel {

    constructor(
        readonly userRepository: UserRepository, 
        readonly modelRepository: ModelRepository, 
        readonly transacionRepository: TransactionRepository) {        
    }

    async execute(input: InputFavoriteModelDto): Promise<ResponseFavoriteModel> {
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
            // Checking if the user already favorited the model
            if(user.getFavoriteModels().includes(model.id)) {
                return left(new FavoriteModelError.UserAlreadyFavoritedError());
            }
            // Doing the mutation on the model domain
            model.addFavorite(user.id);
            // Doing the mutation on the user domain
            user.addFavoriteModel(model.id);
            // Updating the user and model with the transaction repository
            await this.transacionRepository.favoriteUnfavoriteModelTransaction(user, model);
            return right(true);
        } catch (error) {
            console.log(error);
            return left(new AppError.UnexpectedError());
        }
    }
}

export interface InputFavoriteModelDto {
    userEmail: string,
    modelId: string
}

export type ResponseFavoriteModel = Either<
    AppError.UnexpectedError |
    NotFoundError |
    FavoriteModelError.UserAlreadyFavoritedError
    ,
    boolean
>;