import Model from "../../domain/Model";
import User from "../../domain/User";

export default interface TransactionRepository {
    favoriteUnfavoriteModelTransaction(user: User, model: Model): Promise<void>;
}