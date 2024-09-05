export default interface ModelPredictionStrategy {
    predict(parameters: any): Promise<any>;
}