import crypto from 'crypto';
import EncryptService from '../application/ports/EncryptService';
import { Either, left, right } from '../application/errors/either';
import { AuthenticateUserError } from '../application/errors/AuthenticateUser.error';
import RequiredParametersError from '../application/errors/RequiredParameters.error';

export default class User {
    
    constructor(
        readonly id:string, 
        private name: string, 
        private lastName: string,
        private email: string, 
        private password: string, 
        private favoritedModels: string[],
        private predictions: Predictions[]
    ){ }
    
    static async create(name: string, lastName: string, email: string, password: string, encryptService: EncryptService) : Promise<ResponseCreateUserDomain> {
        // Validating required parameters
        if(!name) return left(new RequiredParametersError("Name"));
        if(!lastName) return left(new RequiredParametersError("Last name"));
        if(!email) return left(new RequiredParametersError("Email"));
        if(!password) return left(new RequiredParametersError("Password"));
        
        // Creating a new user
        const id = crypto.randomUUID();
        const favoritedModels: string[] = [];
        const predictions: Predictions[] = [];
        // Generating a encrypted password
        const encryptedPassword = await encryptService.encrypt(password);
        return right(new User(id, name, lastName, email, encryptedPassword, favoritedModels, predictions));
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

    addFavoriteModel(id: string) {
        this.favoritedModels.push(id);
    }

    removeFavoriteModel(id: string) {
        this.favoritedModels = this.favoritedModels.filter(model => model !== id);
    }

    getPredictions() {
        return this.predictions;
    }

    addPrediction(modelId: string, predictionResult: string) {
        this.predictions.push({
            modelId,
            predictionResult,
            createdAt: new Date()
        });
    }

    async validatePassword(password: string, encryptService: EncryptService): Promise<Either<AuthenticateUserError.InvalidPasswordError, true>> {
        const valid = await encryptService.compare(password, this.password);
        if(!valid) return left(new AuthenticateUserError.InvalidPasswordError());
        return right(valid);
    }
}

export type Predictions = {
    modelId: string,
    predictionResult: string
    createdAt: Date
}

type ResponseCreateUserDomain = Either<
    RequiredParametersError
    ,
    User
>;