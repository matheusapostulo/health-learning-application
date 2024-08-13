import DatabaseConnection from "../ports/database/DatabaseConnection";

export default class GetUser {
    constructor(readonly connection: DatabaseConnection) {
    }
    async execute(email: string): Promise<OutputGetUserDto> {
        const user = await this.connection.findUnique(email, 'user');
        if(!user){
            throw new Error('User not found');
        }
        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            favoritedModels: user.favoritedModels,
        };
    }   
}

export interface OutputGetUserDto {
    id: string;
    name: string;
    lastName: string;
    email: string;
    favoritedModels: string[];
}   