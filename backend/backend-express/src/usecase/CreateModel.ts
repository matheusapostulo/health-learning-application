import { PrismaClient } from '@prisma/client';

export default class CreateModel {

    // constructor(){

    // }

    async execute(input: InputCreateModel): Promise<OutputCreateModel>{
        const connection = new PrismaClient();
        const model = await connection.model.create({
            data: {
                modelName: input.modelName,
                description: input.description,
                accuracy: input.accuracy,
                parameters: input.parameters.map(parameter => {
                    return {
                        name: parameter.name,
                        type: parameter.type
                    }
                }),
                createdAt: input.createdAt
            }
        }); 
        return model;
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
    createdAt: Date;
}

interface OutputCreateModel {
    modelName: string;
}