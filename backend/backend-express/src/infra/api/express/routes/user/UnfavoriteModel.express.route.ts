import { InputUnfavoriteModelDto } from '../../../../../application/usecase/UnfavoriteModel';
import Usecase from "../../../../../application/ports/Usecase";
import Route, { HttpMethod } from "../Route";
import { Request, Response } from "express";

export default class UnfavoriteModelRoute implements Route {

    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly UnfavoriteModelUseCase: Usecase
    ) {}

    public static create(UnfavoriteModelUseCase: Usecase){
        return new UnfavoriteModelRoute(
            '/users/:userEmail/favorites/:modelId', 
            HttpMethod.DELETE, 
            UnfavoriteModelUseCase
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const input: InputUnfavoriteModelDto = request.body;
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