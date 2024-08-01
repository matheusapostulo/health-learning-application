import DatabaseConnection from "../../application/ports/database/DatabaseConnection";
import ModelRepository from "../../application/repository/ModelRepository";
import Model from "../../domain/Model";


export default class ModelRepositoryDatabase implements ModelRepository{

    constructor(readonly connection: DatabaseConnection){
    }
    
    async saveModel(model: Model){
        await this.connection.create(model, 'model');
    }

    async getModel(modelId: string){
        const model = await this.connection.findUnique(modelId, 'model');

        if(!model){
            throw new Error('Model not found');
        }

        // Here we'll abstract the database model to the domain model
        return new Model(model.modelId, model.modelName, model.description, model.accuracy, model.parameters, model.favoritedBy, model.favoritesCount, model.createdAt, model.updatedAt);
    }
}