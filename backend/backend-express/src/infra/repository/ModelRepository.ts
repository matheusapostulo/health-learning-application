import DatabaseConnection from "../database/DatabaseConnection";
import Model from "../../domain/Model";



export default interface ModelRepository{
    saveModel(model: Model): Promise<void>;
    getModel(modelId: string): Promise<Model>;
}

export default class ModelRepositoryDatabase implements ModelRepository{

    constructor(readonly connection: DatabaseConnection){
    }
    
    async saveModel(model: Model){
        await this.connection.create(model);
    }

    async getModel(modelId: string){
        const model = await this.connection.findUnique(modelId);

        if(!model){
            throw new Error('Model not found');
        }

        // Here we'll abstract the database model to the domain model
        return new Model(model.modelId, model.modelName, model.description, model.accuracy, model.parameters, model.createdAt, model.updatedAt);
    }
}