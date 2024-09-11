import { ParametersPrediction } from "../usecase/ObtainModelPrediction";
import ModelPredictionStrategy, { PredicitionResult } from "./ModelPredictionStrategy";
import axios from 'axios';

export default class LungCancerModelPredictionStrategy extends ModelPredictionStrategy {
    constructor(
        readonly modelAPIUrl: string, 
        readonly requiredParameters: string[] = 
            ['gender', 'age', 'smoker', 'yellow_fingers', 'anxiety', 'peer_pressure', 'chronic_disease', 'fatigue', 'allergy', 'wheezing', 'alcohol_consume', 'coughing', 'shortness_of_breath', 'swallowing_difficulty', 'chest_pain']
    ) {
        super(modelAPIUrl, requiredParameters);
    }
    
    async predict(parameters: ParametersPrediction[]): Promise<PredicitionResult> {       
        const isValidParameters = this.validateParameters(parameters);
        if(!isValidParameters) {
            return {success: false, valueOrError: "Invalid parameters"};
        }

        const convertedParameters = this.convertParameters(parameters);

        try {
            const res = await axios.post(this.getAPIUrl(), convertedParameters)
            return {success: true, valueOrError:res.data.prediction.toString()};
        } catch (error) {
            throw error;
        }
    }

    protected validateParameters(parameters: ParametersPrediction[]): boolean {
        const parameterMap = new Map<string, any>();
        parameters.forEach((parameter) => parameterMap.set(parameter.name, parameter.value));
    
        return this.requiredParameters.every(parameter => parameterMap.has(parameter));
    }
    
    protected mapValue(parameter: string): number | null {
        const mapping = new Map<string, number>([
            ["yes", 1],
            ["no", 2],
        ]);

        return mapping.get(parameter) || null;
    }

    protected convertParameters(parameters: ParametersPrediction[]): object {
        let convertedParameters = {};
        parameters.forEach((parameter) => {
            convertedParameters = 
                {...convertedParameters, 
                    [parameter.name]: parameter.value == "yes" || parameter.value == "no" ? 
                        this.mapValue(parameter.value) 
                        : 
                        Number(parameter.value)
                };
        });
        return convertedParameters;
    }
}