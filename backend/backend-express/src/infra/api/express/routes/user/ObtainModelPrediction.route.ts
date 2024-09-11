import Usecase from "../../../../../application/ports/Usecase";
import Route, { HttpMethod, RequiresAuthentication } from "../Route";
import { Request, Response } from "express";
import { InputObtainModelPredictionDto, ParametersPrediction, ResponseObtainModelPrediction } from '../../../../../application/usecase/ObtainModelPrediction';

export default class ObtainModelPredictionRoute implements Route {

    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly ObtainModelPredictionUseCase: Usecase,
        readonly requireAuthentication: RequiresAuthentication
    ) {}

    public static create(ObtainModelPredictionUseCase: Usecase){
        return new ObtainModelPredictionRoute(
            '/users/:userId/prediction/:modelId', 
            HttpMethod.POST, 
            ObtainModelPredictionUseCase,
            RequiresAuthentication.REQUIRES_AUTHENTICATION
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const {userId, modelId} = request.params;
                let parameters: ParametersPrediction[];

                parameters = request.body.parameters;

                const input: InputObtainModelPredictionDto = {userId, modelId, parameters};
                const output: ResponseObtainModelPrediction = await this.ObtainModelPredictionUseCase.execute(input);
                
                if(output.isLeft()){
                    response.status(output.value.statusCode).json({message: output.value.message});
                    return;
                }
                response.status(200).json(output.value);
            } catch (error) {
                console.log(error)
            }
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}