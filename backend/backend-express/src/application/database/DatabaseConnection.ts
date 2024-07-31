import Model from "../../domain/Model";
import User from "../../domain/User";

export default interface DatabaseConnection{
    createModel(model: Model): Promise<any>;
    findUniqueModel(modelId: string): Promise<any>;
    findModelByCategory(category: string): Promise<any>;
    createUser(user: User): Promise<any>;
    close(): Promise<void>;
}
