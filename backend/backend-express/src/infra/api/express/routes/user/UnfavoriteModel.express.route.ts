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
            '/users/:userEmail/favorites/:modelId', 
            HttpMethod.DELETE, 
            UnfavoriteModelUseCase,
            RequiresAuthentication.REQUIRES_AUTHENTICATION
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const {userEmail, modelId} = request.params;
                const input: InputUnfavoriteModelDto = {userEmail, modelId};
                await this.UnfavoriteModelUseCase.execute(input);
                
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