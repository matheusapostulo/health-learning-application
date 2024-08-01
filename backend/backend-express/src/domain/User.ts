import crypto from 'crypto';

export default class User {
    
    constructor(
        readonly userId:string, 
        private name: string, 
        private lastName: string,
        private email: string, 
        private password: string, 
        private favoriteModels: string[]
    ){ 
        if(!name) throw new Error("Name is required");
        if(!lastName) throw new Error("LastName is required");
        if(!email) throw new Error("Email is required");
        if(!password) throw new Error("Password is required");
    }

    static create(name: string, lastName: string, email: string, password: string) {
        const userId = crypto.randomUUID();
        const favoritedModels: string[] = [];
        return new User(userId, name, lastName, email, password, favoritedModels);
    }

    getName() {
        return this.name;
    }

    updateName(name: string) {
        this.name = name;
    }

    getLastName() {
        return this.lastName;
    }

    updateLastName(lastName: string) {
        this.lastName = lastName;
    }

    getEmail() {
        return this.email;
    }

    updateEmail(email: string) {
        this.email = email;
    }

    getPassword() {
        return this.password;
    }

    updatePassword(password: string) {
        this.password = password;
    }

    getFavoriteModels() {
        return this.favoriteModels;
    }

    addFavoriteModel(modelId: string) {
        this.favoriteModels.push(modelId);
    }

    removeFavoriteModel(modelId: string) {
        this.favoriteModels = this.favoriteModels.filter(model => model !== modelId);
    }
}