import { Request, Response } from "express";
// Importing routes
import FavoriteModelRoute from './../../../src/infra/api/express/routes/user/FavoriteModel.express.route';
import UnfavoriteModelRoute from '../../../src/infra/api/express/routes/user/UnfavoriteModel.express.route.ts';
// Mocking usecases
const FavoriteModelUseCase = require('../../../src/application/usecase/FavoriteModel')
const UnfavoriteModelUseCase = require('../../../src/application/usecase/UnfavoriteModel')

describe('getUser', () => {
    it('', () => {
        expect(true).toBe(true);
    });
});

describe('createUser', () => {
    it('', () => {
        expect(true).toBe(true);
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