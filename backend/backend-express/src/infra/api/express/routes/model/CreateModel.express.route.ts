import { InputCreateModelDto, ResponseCreateModel } from './../../../../../application/usecase/CreateModel';
import Usecase from "../../../../../application/ports/Usecase";
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

            const output: ResponseCreateModel = await this.GetModelUseCase.execute(input);

            if(output.isLeft()){
                response.status(output.value.statusCode).json({message :output.value.message});
                return;
            }

            response.status(201).json(output.value);
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

}