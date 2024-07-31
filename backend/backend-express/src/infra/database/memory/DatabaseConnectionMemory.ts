import Model from "../../../domain/Model";
import User from "../../../domain/User";
import DatabaseConnection from "../../../application/database/DatabaseConnection";

export default class DatabaseConnectionMemory implements DatabaseConnection {
    models: Model[] = [];
    users: User[] = [];

    constructor(){
        this.models = [];
    }

    async createModel(model: Model): Promise<any> {
        this.models.push(model);
        return model.modelId;
    }
    
    async findUniqueModel(modelId: string): Promise<any> {
        const model = this.models.find(model => model.modelId === modelId);
        return model;
    } 
    
    async findModelByCategory(category: string): Promise<any> {
        const models = this.models.filter(model => model.category === category);
        return models;
    }

    async createUser(user: User): Promise<any> {
        this.users.push(user);
        return user.userId;
    }

    async close(): Promise<void> {
        return Promise.resolve();
    }
}