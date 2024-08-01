import crypto from 'crypto';
import EncryptService from '../application/ports/EncryptService';

export default class User {
    
    constructor(
        readonly userId:string, 
        private name: string, 
        private lastName: string,
        private email: string, 
        private password: string, 
        private favoritedModels: string[],
    ){ 
        if(!name) throw new Error("Name is required");
        if(!lastName) throw new Error("LastName is required");
        if(!email) throw new Error("Email is required");
    }
    
    static async create(name: string, lastName: string, email: string, password: string, encryptService: EncryptService) {
        const userId = crypto.randomUUID();
        const favoritedModels: string[] = [];
        // Generating a encrypted password
        if(!password) throw new Error("Password is required");
        const encryptedPassword = await encryptService.encrypt(password);
        return new User(userId, name, lastName, email, encryptedPassword, favoritedModels);
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
        return this.favoritedModels;
    }

    addFavoriteModel(modelId: string) {
        this.favoritedModels.push(modelId);
    }

    removeFavoriteModel(modelId: string) {
        this.favoritedModels = this.favoritedModels.filter(model => model !== modelId);
    }

    async validatePassword(password: string, encryptService: EncryptService) {
        const valid = await encryptService.compare(password, this.password);
        if(!valid) throw new Error("Invalid password");
        return valid;
    }
}