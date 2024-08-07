import DatabaseConnection from "../../application/ports/database/DatabaseConnection";
import ModelRepository from "../../application/repository/ModelRepository";
import Model from "../../domain/Model";


export default class ModelRepositoryDatabase implements ModelRepository{

    constructor(readonly connection: DatabaseConnection){
    }
    
    async saveModel(model: Model){
        await this.connection.create(model);
    }

    async getModel(id: string): Promise<Model> {
        const model = await this.connection.findUnique(id, 'model');

        if(!model){
            throw new Error('Model not found');
        }

        // Here we'll abstract the database model to the domain model
        return new Model(model.id, model.modelName, model.category, model.description, model.accuracy, model.parameters, model.favoritedBy, model.favoritesCount, model.createdAt, model.updatedAt);
    }
}