import Model from "../../../domain/Model";
import User from "../../../domain/User";

export default interface DatabaseConnection{
    create(entity: any): Promise<any>;
    findUnique(paramToFind: string, entity: string): Promise<any>;
    findModelByCategory(category: string): Promise<any>;
    favoriteUnfavoriteModelTransaction(user: User, model: Model): Promise<void>;
    close(): Promise<void>;
}
