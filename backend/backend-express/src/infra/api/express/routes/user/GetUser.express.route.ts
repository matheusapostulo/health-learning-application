import Usecase from "../../../../../application/ports/Usecase";
import { ResponseGetUser } from "../../../../../application/usecase/GetUser";
import Route, { HttpMethod, RequiresAuthentication } from "../Route";
import { Request, Response } from "express";

export default class GetUserRoute implements Route {

    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly GetUserUseCase: Usecase,
        readonly requireAuthentication: boolean
    ) {}

    public static create(GetUserUseCase: Usecase){
        return new GetUserRoute(
            '/users/:id', 
            HttpMethod.GET, 
            GetUserUseCase,
            RequiresAuthentication.NOT_REQUIRES_AUTHENTICATION
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const {id} = request.params;

            const output: ResponseGetUser = await this.GetUserUseCase.execute(id);

            console.log("Output:", id);

            if(output.isLeft()){
                response.status(output.value.statusCode).json({error_code: output.value.errorCode, error_description: output.value.message});
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