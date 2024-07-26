import Model from "../../domain/Model";
import ModelRepository from "../../infra/repository/ModelRepository";


export default class CreateModel {
    
    constructor(readonly modelRepository: ModelRepository){
    }

    async execute(input: InputCreateModel): Promise<OutputCreateModel>{
        const model = Model.create(input.modelName, input.description, input.accuracy, input.parameters);
        await this.modelRepository.saveModel(model);
        return {
            modelId: model.modelId
        };
    }
}

type Parameter = {
    name: string;
    type: string;
}

interface InputCreateModel {
    modelName: string;
    description: string;
    accuracy: number;
    parameters: Parameter[];
}

interface OutputCreateModel {
    modelId: string;
}