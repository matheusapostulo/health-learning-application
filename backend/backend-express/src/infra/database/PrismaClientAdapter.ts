import { PrismaClient } from '@prisma/client';
import Model from '../../domain/Model';
import DatabaseConnection from '../../application/database/DatabaseConnection';
import User from '../../domain/User';


export class PrismaClientAdapter implements DatabaseConnection{
    connection: any;

    constructor(){
        this.connection = new PrismaClient();
    }

    async createModel(model: Model): Promise<any> {
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
                favoritedBy: model.getFavoritedBy(),
                favoritesCount: model.getFavoritesCount(),
                createdAt: model.createdAt
            }
        });
    }

    async findUniqueModel(modelId: string): Promise<any> {
        return this.connection.model.findUnique({
            where: {
                modelId: modelId
            }
        });
    }

    async findModelByCategory(category: string): Promise<any> {
        return this.connection.model.findMany({
            where: {
                category: category
            }
        });
    }

    async createUser(user: User): Promise<any> {
        return this.connection.user.create({
            data: {
                userId: user.userId,
                name: user.name,
                email: user.email,
                password: user.password,
                favoritedModels: user.getFavoriteModels()
            }
        })
    }

    async close(): Promise<void> {
        this.connection.$disconnect(); 
    }
}