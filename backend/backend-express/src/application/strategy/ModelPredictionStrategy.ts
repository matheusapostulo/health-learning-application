import { ParametersPrediction } from "../usecase/ObtainModelPrediction";
import dotenv from 'dotenv';
dotenv.config();

export default abstract class ModelPredictionStrategy {
    baseAPIUrl: string = process.env.FASTAPI_URL as string;

    constructor(readonly modelAPIUrl: string, readonly requiredParameters: string[]){
    };

    getAPIUrl(): string {
        return this.baseAPIUrl + this.modelAPIUrl;
    }

    abstract predict(parameters: any): Promise<PredicitionResult>;
    protected abstract validateParameters(parameters: any): boolean;
    protected abstract mapValue(parameter: any): number | null;
    protected abstract convertParameters(parameters: ParametersPrediction[]): object;
}

export type PredicitionResult = {
    success: boolean;
    valueOrError: string;
}