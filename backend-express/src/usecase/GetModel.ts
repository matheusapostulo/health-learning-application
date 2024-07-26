import { PrismaClient } from '@prisma/client'

export default class GetModel {
    
    // constructor(){

    // }

    async execute(modelName: string): Promise<OutputGetModel>{
        const connection = new PrismaClient();
        const model = await connection.model.findFirst({
            where: {
                modelName: modelName
            }
        });

        if(!model){
            throw new Error('Model not found');
        }

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
    updatedAt: Date;
}