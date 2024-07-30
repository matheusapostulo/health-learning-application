import { PrismaClient } from '@prisma/client';
import Model from '../../domain/Model';
import DatabaseConnection from './DatabaseConnection';


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
                category: model.category,
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

    async findByCategory(category: string): Promise<any> {
        return this.connection.model.findMany({
            where: {
                category: category
            }
        });
    }

    async close(): Promise<void> {
        this.connection.$disconnect(); 
    }
}