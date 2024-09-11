import { ParametersPrediction } from "../usecase/ObtainModelPrediction";

export default abstract class ModelPredictionStrategy {
    baseAPIUrl: string = "http://host.docker.internal:4000/";

    constructor(readonly modelAPIUrl: string, readonly requiredParameters: string[]){
    };

    getAPIUrl(): string {
        return this.baseAPIUrl + this.modelAPIUrl;
    }

    abstract predict(parameters: any): Promise<PredicitionResult>;
    protected abstract validateParameters(parameters: any): boolean;
    protected abstract mapValue(parameter: string): number | null;
    protected abstract convertParameters(parameters: ParametersPrediction[]): object;
}

export type PredicitionResult = {
    success: boolean;
    valueOrError: string;
}