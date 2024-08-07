import ModelRepository from "../repository/ModelRepository";
import TransactionRepository from "../repository/TransactionRepository";
import UserRepository from "../repository/UserRepository";

export default class UnfavoriteModel {
    
    constructor(
        readonly userRepository: UserRepository,
        readonly modelRepository: ModelRepository,
        readonly transactionRepository: TransactionRepository){
    }

    async execute(input: InputUnfavoriteModel): Promise<void>{
        // Taking the model from the database
        const model = await this.modelRepository.getModel(input.modelId);
        // Taking the user from the database
        const user = await this.userRepository.getUser(input.userEmail);
        // Doing the mutation in the model
        model.removeFavorite(user.id);
        // Doing the mutation in the user
        user.removeFavoriteModel(model.id);
        // Updating the user and model with the transaction repository
        await this.transactionRepository.favoriteUnfavoriteModelTransaction(user, model);
    }
}

interface InputUnfavoriteModel{
    userEmail: string;
    modelId: string;
}