import { InputCreateModelDto } from './../../../../../application/usecase/CreateModel';
import Usecase from "../../../../../application/ports/Usecase";
import { OutputCreateModelDto } from "../../../../../application/usecase/CreateModel";
import Route, { HttpMethod, RequiresAuthentication } from "../Route";
import { Request, Response } from "express";

export default class CreateModelRoute implements Route {

    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly GetModelUseCase: Usecase,
        readonly requireAuthentication: RequiresAuthentication
    ) {}

    public static create(CreateModelUseCase: Usecase){
        return new CreateModelRoute(
            '/models', 
            HttpMethod.POST, 
            CreateModelUseCase,
            RequiresAuthentication.REQUIRES_AUTHENTICATION
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const input: InputCreateModelDto = request.body;

            const output: OutputCreateModelDto = await this.GetModelUseCase.execute(input);

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