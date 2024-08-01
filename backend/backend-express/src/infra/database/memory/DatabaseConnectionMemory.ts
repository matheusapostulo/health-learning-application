import Model from "../../../domain/Model";
import User from "../../../domain/User";
import DatabaseConnection from "../../../application/ports/database/DatabaseConnection";

export default class DatabaseConnectionMemory implements DatabaseConnection {
    models: Model[] = [];
    users: User[] = [];

    constructor(){
        this.models = [];
    }

    async create(entity: any): Promise<any> {
        const entityName = this.getEntityName(entity);
        switch(entityName){
            case 'model':
                this.models.push(entity);
                return entity.modelId;
            case 'user':
                this.users.push(entity);
                return entity.userId;
        }
    }
    
    async findUnique(id: string, entityName: string): Promise<any> {
        switch(entityName){
            case 'model':
                return this.models.find(model => model.modelId === id);
            case 'user':
                return this.users.find(user => user.userId === id);
        }
    } 
    
    async findModelByCategory(category: string): Promise<any> {
        const models = this.models.filter(model => model.getCategory() === category);
        return models;
    }

    async close(): Promise<void> {
        return Promise.resolve();
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