import { Request, Response } from "express";
// Importing routes
import GetUserRoute from './../../../src/infra/api/express/routes/user/GetUser.express.route';
import CreateUserRoute from './../../../src/infra/api/express/routes/user/CreateUser.express.route.ts';
import FavoriteModelRoute from './../../../src/infra/api/express/routes/user/FavoriteModel.express.route';
import UnfavoriteModelRoute from '../../../src/infra/api/express/routes/user/UnfavoriteModel.express.route.ts';
// Mocking usecases
const GetUserUseCase = require('../../../src/application/usecase/GetUser.ts')
const CreateUserUseCase = require('../../../src/application/usecase/CreateUser.ts')
const FavoriteModelUseCase = require('../../../src/application/usecase/FavoriteModel')
const UnfavoriteModelUseCase = require('../../../src/application/usecase/UnfavoriteModel')

describe('getUser', () => {
    const mockOutput = { id: '123', name: 'user', lastName: 'test', email: "email@test.com", favoritedModels: []};
    // Mocking the GetModel execute method
    GetUserUseCase.execute = jest.fn();
    GetUserUseCase.execute.mockResolvedValue(mockOutput);

    const req = { 
        params: { email: "email@test.com" }
    } as unknown as Request;
    const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
    } as unknown as Response;

    // Route
    const getUserRoute = GetUserRoute.create(GetUserUseCase);

    it('Should get the route api method with getMethod method', () => {
        expect(getUserRoute.getMethod()).toBe('get');
    });
    
    it("Should get the handler api path with getPath method", () => {
        expect(getUserRoute.getPath()).toBe('/users/:email');
    });

    it('Should get a model with getHandler method', async () => {
        const handler = getUserRoute.getHandler();
        await handler(req, res);

        expect(GetUserUseCase.execute).toHaveBeenCalledWith("email@test.com");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockOutput);
    });
});

describe('createUser', () => {
    const mockOutput = { id: '123' };
    // Mocking the CreateModel execute method
    CreateUserUseCase.execute = jest.fn();
    CreateUserUseCase.execute.mockResolvedValue(mockOutput);

    const InputCreateUser = {
        name: "user",
        lastName:"test",
        email: 'email@test.com',
        password: "1234"
    }

    const req = { 
        body: InputCreateUser
    } as unknown as Request;
    const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
    } as unknown as Response;

    // Route
    const createUserRoute = CreateUserRoute.create(CreateUserUseCase);

    it('Should get the handler api method with getMethod method', () => {
        expect(createUserRoute.getMethod()).toBe('post');
    });
    
    it("Should get the handler api path with getPath method", () => {
        expect(createUserRoute.getPath()).toBe('/users');
    });

    it('Should create a model with getHandler method', async () => {
        const handler = createUserRoute.getHandler();
        await handler(req, res);

        expect(CreateUserUseCase.execute).toHaveBeenCalledWith(InputCreateUser);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockOutput);
    });
})

describe('authenticateUser', () => {
    it('', () => {
        expect(true).toBe(true);
    });
});

describe('favoriteModel', () => {
    const mockOutput = Promise.resolve();
    // Mocking the CreateModel execute method
    FavoriteModelUseCase.execute = jest.fn();
    FavoriteModelUseCase.execute.mockResolvedValue(mockOutput);

    const InputFavoriteModel = {
        userEmail: "test@gmail.com",
        modelId:'123'
    }

    const req = { 
        body: InputFavoriteModel
    } as unknown as Request;
    const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
    } as unknown as Response;

    // Route
    const favoriteModelRoute = FavoriteModelRoute.create(FavoriteModelUseCase);

    it('Should get the handler api method with getMethod method', () => {
        expect(favoriteModelRoute.getMethod()).toBe('post');
    });
    
    it("Should get the handler api path with getPath method", () => {
        expect(favoriteModelRoute.getPath()).toBe('/users/:userEmail/favorites/:modelId');
    });

    it('Should create a model with getHandler method', async () => {
        const handler = favoriteModelRoute.getHandler();
        await handler(req, res);

        expect(FavoriteModelUseCase.execute).toHaveBeenCalledWith(InputFavoriteModel);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({message: 'Model favorited successfully'});
    });
})

describe('unfavoriteModel', () => {
    const mockOutput = Promise.resolve();
    // Mocking the CreateModel execute method
    UnfavoriteModelUseCase.execute = jest.fn();
    UnfavoriteModelUseCase.execute.mockResolvedValue(mockOutput);

    const InputUnfavoriteModel = {
        userEmail: "test@gmail.com",
        modelId:'123'
    }

    const req = { 
        body: InputUnfavoriteModel
    } as unknown as Request;
    const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
    } as unknown as Response;

    // Route
    const unfavoriteModelRoute = UnfavoriteModelRoute.create(UnfavoriteModelUseCase);

    it('Should get the handler api method with getMethod method', () => {
        expect(unfavoriteModelRoute.getMethod()).toBe('delete');
    });
    
    it("Should get the handler api path with getPath method", () => {
        expect(unfavoriteModelRoute.getPath()).toBe('/users/:userEmail/favorites/:modelId');
    });

    it('Should create a model with getHandler method', async () => {
        const handler = unfavoriteModelRoute.getHandler();
        await handler(req, res);

        expect(UnfavoriteModelUseCase.execute).toHaveBeenCalledWith(InputUnfavoriteModel);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({message: 'Model unfavorited successfully'});
    });
})