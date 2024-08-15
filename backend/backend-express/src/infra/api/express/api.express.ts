import { Api } from "../Api";
import express, { Express, NextFunction, Request, Response } from "express";
import Route from "./routes/Route";
import JwtService from "../../../application/ports/JwtService";

export default class ApiExpress implements Api{
    private app: Express;

    constructor(routes: Route[], readonly jwtService: JwtService){
        this.app = express();
        this.app.use(express.json());
        this.addRoutes(routes);
    }

    public static create(routes: Route[], jwtService: JwtService){
        console.log(jwtService)
        return new ApiExpress(routes, jwtService);
    }

    private addRoutes(routes: Route[]){
        routes.forEach(route => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();

            // Check if the route requires authentication
            if (route.requireAuthentication) {
                this.app[method](path, this.checkTokenAndAuthorize, handler); // Apply middleware first
            } else {
                this.app[method](path, handler); // No middleware for non-authenticated routes
            }
        })
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            this.listRoutes();
        });
    }

    private listRoutes(){
        const routes = this.app._router.stack
            .filter((route: any) => route.route)
            .map((route: any) => {  
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method
                }
        });

        console.log(routes);
    }

    private checkTokenAndAuthorize = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        
        if(!token) {
            return res.status(401).json({message: "Erro: Token não enviado."});
        }

        const isTokenValid = await this.jwtService.checkToken(token);

        if(!isTokenValid){
            return res.status(401).json({message: "Erro: Token inválido."});
        }

        return next();
    }
}