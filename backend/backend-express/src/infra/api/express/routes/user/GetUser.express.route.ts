import Usecase from "../../../../../application/ports/Usecase";
import { OutputGetUserDto } from "../../../../../application/usecase/GetUser";
import Route, { HttpMethod } from "../Route";
import { Request, Response } from "express";

export default class GetUserRoute implements Route {

    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly GetUserUseCase: Usecase
    ) {}

    public static create(GetUserUseCase: Usecase){
        return new GetUserRoute(
            '/users/:email', 
            HttpMethod.GET, 
            GetUserUseCase
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const {email} = request.params;

            const output: OutputGetUserDto = await this.GetUserUseCase.execute(email);

            response.status(200).json(output);
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}