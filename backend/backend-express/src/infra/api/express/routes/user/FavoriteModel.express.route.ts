import { InputFavoriteModelDto, ResponseFavoriteModel } from './../../../../../application/usecase/FavoriteModel';
import Usecase from "../../../../../application/ports/Usecase";
import Route, { HttpMethod, RequiresAuthentication } from "../Route";
import { Request, Response } from "express";

export default class FavoriteModelRoute implements Route {

    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly FavoriteModelUseCase: Usecase,
        readonly requireAuthentication: RequiresAuthentication
    ) {}

    public static create(FavoriteModelUseCase: Usecase){
        return new FavoriteModelRoute(
            '/users/:userEmail/favorites/:modelId', 
            HttpMethod.POST, 
            FavoriteModelUseCase,
            RequiresAuthentication.REQUIRES_AUTHENTICATION
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const {userId, modelId} = request.params;
                const input: InputFavoriteModelDto = {userId, modelId};
                const output: ResponseFavoriteModel = await this.FavoriteModelUseCase.execute(input);
                if(output.isLeft()){
                    response.status(output.value.statusCode).json({error_code: output.value.errorCode, error_description: output.value.message});
                    return;
                }
                response.status(200).json({message: 'Model favorited successfully'});
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