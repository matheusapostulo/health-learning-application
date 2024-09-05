import ModelPredictionStrategy from "./ModelPredictionStrategy";

export default class LungCancerModelPredictionStrategy implements ModelPredictionStrategy {
    constructor(){}
    
    async predict(): Promise<any> {
        return "Prediction result";
    }
}