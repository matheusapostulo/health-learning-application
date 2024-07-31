import crypto from 'crypto';

export default class User {
    
    constructor(readonly userId:string, readonly name: string, readonly email: string, readonly password: string, private favoriteModels: string[]) {
    }

    static create(name: string, email: string, password: string) {
        const userId = crypto.randomUUID();
        const favoritedModels: string[] = [];
        return new User(userId, name, email, password, favoritedModels);
    }

    getFavoriteModels() {
        return this.favoriteModels;
    }
}