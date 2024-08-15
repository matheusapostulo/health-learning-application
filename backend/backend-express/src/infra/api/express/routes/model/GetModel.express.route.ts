import Usecase from "../../../../../application/ports/Usecase";
import { OutputGetModelDto } from "../../../../../application/usecase/GetModel";
import Route, { HttpMethod, RequiresAuthentication } from "../Route";
import { Request, Response } from "express";

export default class GetModelRoute implements Route {

    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly GetModelUseCase: Usecase,
        readonly requireAuthentication: RequiresAuthentication
    ) {}

    public static create(GetModelUsecase: Usecase){
        return new GetModelRoute(
            '/models/:id', 
            HttpMethod.GET, 
            GetModelUsecase,
            RequiresAuthentication.NOT_REQUIRES_AUTHENTICATION
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const {id} = request.params;

            const output: OutputGetModelDto = await this.GetModelUseCase.execute(id);

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