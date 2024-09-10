import { InputAuthenticateUserDto, ResponseAuthenticateUser } from './../../../../../application/usecase/AuthenticateUser';
import Usecase from "../../../../../application/ports/Usecase";
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

            console.log(input);

            const output: ResponseAuthenticateUser = await this.AuthenticateUserUseCase.execute(input);

            if(output.isLeft()){
                response.status(output.value.statusCode).json({message: output.value.message});
                return;
            }

            response.status(200).json(output.value);
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}