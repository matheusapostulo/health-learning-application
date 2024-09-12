import Usecase from "../../../../../application/ports/Usecase";
import { ResponseGetModel } from "../../../../../application/usecase/GetModel";
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

            const output: ResponseGetModel = await this.GetModelUseCase.execute(id);

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