import { ResponseUnfavoriteModel } from './../../../../../application/usecase/UnfavoriteModel';
import { InputUnfavoriteModelDto } from '../../../../../application/usecase/UnfavoriteModel';
import Usecase from "../../../../../application/ports/Usecase";
import Route, { HttpMethod, RequiresAuthentication } from "../Route";
import { Request, Response } from "express";

export default class UnfavoriteModelRoute implements Route {

    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly UnfavoriteModelUseCase: Usecase,
        readonly requireAuthentication: RequiresAuthentication
    ) {}

    public static create(UnfavoriteModelUseCase: Usecase){
        return new UnfavoriteModelRoute(
            '/users/:userId/favorites/:modelId', 
            HttpMethod.DELETE, 
            UnfavoriteModelUseCase,
            RequiresAuthentication.REQUIRES_AUTHENTICATION
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const {userId, modelId} = request.params;
                const input: InputUnfavoriteModelDto = {userId, modelId};
                const output: ResponseUnfavoriteModel = await this.UnfavoriteModelUseCase.execute(input);
                
                if(output.isLeft()){
                    response.status(output.value.statusCode).json({error_code: output.value.errorCode, error_description: output.value.message});
                    return;
                }
                
                response.status(200).json({message: 'Model unfavorited successfully'});
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