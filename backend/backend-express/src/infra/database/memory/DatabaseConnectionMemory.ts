import Model from "../../../domain/Model";
import DatabaseConnection from "../DatabaseConnection";

export default class DatabaseConnectionMemory implements DatabaseConnection {
    models: Model[] = [];

    constructor(){
        this.models = [];
    }

    async create(model: Model): Promise<any> {
        this.models.push(model);
        return model.modelId;
    }
    
    async findUnique(modelId: string): Promise<any> {
        const model = this.models.find(model => model.modelId === modelId);
        return model;
    } 
    
    async findByCategory(category: string): Promise<any> {
        const models = this.models.filter(model => model.category === category);
        return models;
    }

    async close(): Promise<void> {
        return Promise.resolve();
    }
}