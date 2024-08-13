import { InputFavoriteModelDto } from './../../../../../application/usecase/FavoriteModel';
import Usecase from "../../../../../application/ports/Usecase";
import Route, { HttpMethod } from "../Route";
import { Request, Response } from "express";

export default class FavoriteModelRoute implements Route {

    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly FavoriteModelUseCase: Usecase
    ) {}

    public static create(FavoriteModelUseCase: Usecase){
        return new FavoriteModelRoute(
            '/users/:userEmail/favorites/:modelId', 
            HttpMethod.POST, 
            FavoriteModelUseCase
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const {userEmail, modelId} = request.params;
                const input: InputFavoriteModelDto = {userEmail, modelId};
                await this.FavoriteModelUseCase.execute(input);
                
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