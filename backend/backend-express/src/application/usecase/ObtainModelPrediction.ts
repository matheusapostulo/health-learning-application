import { AppError } from "../errors/AppError.error";
import { Either, left, right } from "../errors/either";
import NotFoundError from "../errors/NotFound.error";
import DatabaseConnection from "../ports/database/DatabaseConnection";
import UserRepository from "../repository/UserRepository";
import ModelPredictionStrategy from "../strategy/ModelPredictionStrategy";

export default class ObtainModelPrediction {
    constructor(
        readonly connection: DatabaseConnection,
        readonly userRepository: UserRepository,
        readonly modelPredictionStrategy: ModelPredictionStrategy
    ){ }

    async execute(input: InputObtainModelPredictionDto): Promise<ResponseObtainModelPrediction> {
        try {
            // Checking if the model exists
            const model = await this.connection.findUnique(input.modelId, 'model');
            if(!model){
                return left(new NotFoundError(input.modelId));
            }
            // Obtaining the user as domain to make mutation
            const user = await this.userRepository.getUser(input.userId);
            if(!user) {
                return left(new NotFoundError(input.userId));
            }
            // Doing the prediction
            const predictionResult = await this.modelPredictionStrategy.predict(input.parameters);
            // Adding the prediction to the user
            user.addPrediction(model.id, predictionResult);
            // Saving the user
            await this.userRepository.updateUser(user);
            return right({
                predictionResult: predictionResult
            });
        } catch (error) {
            return left(new AppError.UnexpectedError());
        }
    }
}

type ParametersPrediction = {
    name: string;
    value: string | number;
}

export interface InputObtainModelPredictionDto {
    userId: string;
    modelId: string;
    parameters: ParametersPrediction[];
}

export interface OutputObtainModelPredictionDto {
    predictionResult: string;
}

export type ResponseObtainModelPrediction = Either<
    AppError.UnexpectedError |
    NotFoundError
    ,
    OutputObtainModelPredictionDto
>;