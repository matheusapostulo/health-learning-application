import Model, { Parameter } from "../../domain/Model";
import ModelRepository from "../repository/ModelRepository";


export default class CreateModel {
    
    constructor(readonly modelRepository: ModelRepository){
    }

    async execute(input: InputCreateModel): Promise<OutputCreateModel>{
        const model = Model.create(input.modelName, input.category, input.description, input.accuracy, input.parameters);
        await this.modelRepository.saveModel(model);
        return {
            modelId: model.modelId
        };
    }
}

interface InputCreateModel {
    modelName: string;
    category: string;
    description: string;
    accuracy: number;
    parameters: Parameter[];
}

interface OutputCreateModel {
    modelId: string;
}