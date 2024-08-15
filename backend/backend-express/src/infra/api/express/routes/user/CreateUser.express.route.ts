import { InputCreateUserDto } from './../../../../../application/usecase/CreateUser';
import Usecase from "../../../../../application/ports/Usecase";
import { OutputCreateUserDto } from "../../../../../application/usecase/CreateUser";
import Route, { HttpMethod, RequiresAuthentication } from "../Route";
import { Request, Response } from "express";

export default class CreateUserRoute implements Route {

    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly CreateUserUseCase: Usecase,
        readonly requireAuthentication: RequiresAuthentication
    ) {}

    public static create(CreateUserUseCase: Usecase){
        return new CreateUserRoute(
            '/users', 
            HttpMethod.POST, 
            CreateUserUseCase,
            RequiresAuthentication.NOT_REQUIRES_AUTHENTICATION
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const input: InputCreateUserDto = request.body;

            const output: OutputCreateUserDto = await this.CreateUserUseCase.execute(input);

            response.status(201).json(output);
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}