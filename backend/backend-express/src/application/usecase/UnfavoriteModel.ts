import ModelRepository from "../repository/ModelRepository";
import TransactionRepository from "../repository/TransactionRepository";
import UserRepository from "../repository/UserRepository";

export default class UnfavoriteModel {
    
    constructor(
        readonly userRepository: UserRepository,
        readonly modelRepository: ModelRepository,
        readonly transactionRepository: TransactionRepository){
    }

    async execute(input: InputUnfavoriteModelDto): Promise<void>{
        // Taking the model from the database
        const model = await this.modelRepository.getModel(input.modelId);
        // Taking the user from the database
        const user = await this.userRepository.getUser(input.userEmail);
        // Checking if the user does not have the model as favorite
        if(!user.getFavoriteModels().includes(model.id)){
            throw new Error('User does not have this model as favorite');
        }
        // Doing the mutation in the model
        model.removeFavorite(user.id);
        // Doing the mutation in the user
        user.removeFavoriteModel(model.id);
        // Updating the user and model with the transaction repository
        await this.transactionRepository.favoriteUnfavoriteModelTransaction(user, model);
    }
}

export interface InputUnfavoriteModelDto{
    userEmail: string;
    modelId: string;
}