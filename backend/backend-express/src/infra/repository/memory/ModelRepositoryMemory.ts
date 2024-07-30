import ModelRepository from "../../../application/repository/ModelRepository";
import Model from "../../../domain/Model";

export default class ModelRepositoryMemory implements ModelRepository{
    models: Model[] = [];
    
    constructor(){
        this.models = []
    }
    
    async saveModel(model: Model): Promise<void>{
        this.models.push(model);
    }

    async getModel(modelId: string): Promise<Model>{
        const model = this.models.find(model => model.modelId === modelId);
        if(!model){
            throw new Error('Model not found');
        }
        return model;
    }
}