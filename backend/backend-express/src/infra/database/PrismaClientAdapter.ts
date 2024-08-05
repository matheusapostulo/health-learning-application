import { PrismaClient } from '@prisma/client';
import Model from '../../domain/Model';
import DatabaseConnection from '../../application/ports/database/DatabaseConnection';
import User from '../../domain/User';


export class PrismaClientAdapter implements DatabaseConnection{
    connection: any;

    constructor(){
        this.connection = new PrismaClient();
    }

    async create(entity: any): Promise<any> {
        const entityName = this.getEntityName(entity);
        switch(entityName){
            case 'model':
                return this.connection.model.create({
                    data: {
                        ...entity
                    }
                });
            case 'user':
                return this.connection.user.create({
                    data: {
                        ...entity
                    }
                });
        }
    }

    async findUnique(paramToFind: string, entityName: string): Promise<any> {
        switch(entityName){
            case 'model':
                return this.connection.model.findUnique({
                    where: {
                        id: paramToFind
                    }
                });
            case 'user':
                return this.connection.user.findUnique({
                    where: {
                        email: paramToFind,
                    },
                });
        }
    }

    async findModelByCategory(category: string): Promise<any> {
        return this.connection.model.findMany({
            where: {
                category: category
            }
        });
    }

    async close(): Promise<void> {
        this.connection.$disconnect(); 
    }

    private getEntityName<T>(entity: T): string {
        if (entity instanceof Model) {
            return 'model';
        } else if (entity instanceof User) {
            return 'user';
        } else {
            throw new Error('Tipo de entidade não suportado');
        }
    }
}