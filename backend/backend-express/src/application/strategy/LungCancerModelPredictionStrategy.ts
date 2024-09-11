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
    
    protected mapValue(parameter: boolean): number | null {
        const mapping = new Map<boolean, number>([
            [true, 2],
            [false, 1],
        ]);

        return mapping.get(parameter) || null;
    }

    protected convertParameters(parameters: ParametersPrediction[]): object {
        let convertedParameters = {};
        const isBoolean = (value: any): value is boolean => typeof value === 'boolean';
        parameters.forEach((parameter) => {
            convertedParameters = 
                {...convertedParameters, 
                    [parameter.name]: isBoolean(parameter.value) ? 
                        this.mapValue(parameter.value) 
                        : 
                        Number(parameter.value)
                };
        });
        return convertedParameters;
    }
}