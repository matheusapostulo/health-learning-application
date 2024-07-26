import DatabaseConnection from '../../infra/database/DatabaseConnection';

export default class GetModel {
    
    constructor(readonly connection: DatabaseConnection){
    }

    async execute(modelId: string): Promise<OutputGetModel>{
        const model = await this.connection.findUnique(modelId);
        return model;
    }
}

type Parameter = {
    name: string;
    type: string;
}

interface OutputGetModel {
    modelId: string;
    modelName: string;
    description: string;
    accuracy: number;
    parameters: Parameter[];
    createdAt: Date;
    updatedAt?: Date;
}