import { InputAuthenticateUserDto } from './../../../../../application/usecase/AuthenticateUser';
import Usecase from "../../../../../application/ports/Usecase";
import { OutputAuthenticateUserDto } from "../../../../../application/usecase/AuthenticateUser";
import Route, { HttpMethod, RequiresAuthentication } from "../Route";
import { Request, Response } from "express";

export default class AuthenticateUserRoute implements Route {

    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly AuthenticateUserUseCase: Usecase,
        readonly requireAuthentication: RequiresAuthentication
    ) {}

    public static create(AuthenticateUserUseCase: Usecase){
        return new AuthenticateUserRoute(
            '/auth/login', 
            HttpMethod.POST, 
            AuthenticateUserUseCase,
            RequiresAuthentication.NOT_REQUIRES_AUTHENTICATION
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const input: InputAuthenticateUserDto = request.body;

            const output: OutputAuthenticateUserDto = await this.AuthenticateUserUseCase.execute(input);

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