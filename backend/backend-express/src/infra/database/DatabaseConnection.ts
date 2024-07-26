import { PrismaClient } from '@prisma/client';
import Model from '../../domain/Model';


export default interface DatabaseConnection{
    create(model: Model): Promise<any>;
    close(): Promise<void>;
    findUnique(modelId: string): Promise<any>;
}

export class PrismaClientAdapter implements DatabaseConnection{
    connection: any;

    constructor(){
        this.connection = new PrismaClient();
    }

    async create(model: Model): Promise<any> {
        return this.connection.model.create({
            data: {
                modelId: model.modelId,
                modelName: model.modelName,
                description: model.description,
                accuracy: model.accuracy,
                parameters: model.parameters.map(parameter => {
                    return {
                        name: parameter.name,
                        type: parameter.type
                    }
                }),
                createdAt: model.createdAt
            }
        });
    }

    async findUnique(modelId: string): Promise<any> {
        return this.connection.model.findUnique({
            where: {
                modelId: modelId
            }
        });
    }

    async close(): Promise<void> {
        this.connection.$disconnect(); 
    }
}