import DatabaseConnection from "../../application/ports/database/DatabaseConnection";
import TransactionRepository from "../../application/repository/TransactionRepository";
import Model from "../../domain/Model";
import User from "../../domain/User";

export default class TransactionRepositoryDatabase implements TransactionRepository{
    constructor(readonly connection: DatabaseConnection){
    }
    
    async favoriteUnfavoriteModelTransaction(user: User, model: Model){
        await this.connection.favoriteUnfavoriteModelTransaction(user, model);
    }
}