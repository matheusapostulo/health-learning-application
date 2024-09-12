import Usecase from "../../../../../application/ports/Usecase";
import { OutputGetModelsByCategoryDto, ResponseGetModelsByCategory } from "../../../../../application/usecase/GetModelsByCategory";
import { Request, Response } from "express";
import Route, { HttpMethod, RequiresAuthentication } from "../Route";

export default class GetModelsByCategoryRoute implements Route {
    
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly GetModelsByCategoryUseCase: Usecase,
        readonly requireAuthentication: RequiresAuthentication
    ) {}

    public static create(GetModelsByCategoryUseCase: Usecase){
        return new GetModelsByCategoryRoute(
            '/models/category/:category', 
            HttpMethod.GET, 
            GetModelsByCategoryUseCase,
            RequiresAuthentication.NOT_REQUIRES_AUTHENTICATION
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const {category} = request.params;
            
            const output: ResponseGetModelsByCategory = await this.GetModelsByCategoryUseCase.execute(category);  

            if(output.isLeft()){
                response.status(output.value.statusCode).json({error_code: output.value.errorCode, error_description: output.value.message});
                return;
            }

            response.status(200).json(output.value);
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}