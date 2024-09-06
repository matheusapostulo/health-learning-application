export default interface ModelPredictionStrategy {
    modelAPIUrl: string;
    predict(parameters: any): Promise<any>;
}