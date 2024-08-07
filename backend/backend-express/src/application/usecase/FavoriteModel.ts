import ModelRepository from "../repository/ModelRepository";
import TransactionRepository from "../repository/TransactionRepository";
import UserRepository from "../repository/UserRepository";

export default class FavoriteModel {

    constructor(
        readonly userRepository: UserRepository, 
        readonly modelRepository: ModelRepository, 
        readonly transacionRepository: TransactionRepository) {        
    }

    async execute(input: InputFavoriteModel): Promise<void> {
        // Obtaining the user as domain to make mutation
        const user = await this.userRepository.getUser(input.userEmail);
        // Obtaining the model as domain to make mutation
        const model = await this.modelRepository.getModel(input.modelId);
        // Doing the mutation on the model domain
        model.addFavorite(user.id);
        // Doing the mutation on the user domain
        user.addFavoriteModel(model.id);
        // Updating the user and model with the transaction repository
        await this.transacionRepository.favoriteUnfavoriteModelTransaction(user, model);
    }
}

interface InputFavoriteModel {
    userEmail: string,
    modelId: string
}