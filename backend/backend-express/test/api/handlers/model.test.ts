import { Request, Response } from "express";
// Importing routes
import GetModelRoute from './../../../src/infra/api/express/routes/model/GetModel.express.route';
import GetModelsByCategoryRoute from './../../../src/infra/api/express/routes/model/GetModelsByCategory.express.route';
import CreateModelRoute from './../../../src/infra/api/express/routes/model/CreateModel.express.route';
import { typeParameter } from "../../../src/domain/Model";
// Mocking usecases
const GetModelUseCase = require('../../../src/application/usecase/GetModel')
const GetModelsByCategoryUseCase = require('../../../src/application/usecase/GetModelsByCategory')
const CreateModelUseCase = require('../../../src/application/usecase/CreateModel')
// Mocking the model usecases
jest.mock('../../../src/application/usecase/GetModel')
jest.mock('../../../src/application/usecase/GetModelsByCategory')
jest.mock('../../../src/application/usecase/CreateModel')
jest.mock('../../../src/application/usecase/FavoriteModel')
jest.mock('../../../src/application/usecase/UnfavoriteModel')

describe('getModel', () => {
    const date = new Date();
    const mockOutput = { id: '123', modelName: 'model', category: 'category', description: 'description', accuracy: 0.9, parameters: [], favoritedBy: [], favoritesCount: 0, createdAt: date, updatedAt: date};
    // Mocking the GetModel execute method
    GetModelUseCase.execute = jest.fn();
    GetModelUseCase.execute.mockResolvedValue(mockOutput);

    const req = { 
        params: { id: '123' }
    } as unknown as Request;
    const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
    } as unknown as Response;

    // Route
    const getModelRoute = GetModelRoute.create(GetModelUseCase);

    it('Should get the route api method with getMethod method', () => {
        expect(getModelRoute.getMethod()).toBe('get');
    });
    
    it("Should get the handler api path with getPath method", () => {
        expect(getModelRoute.getPath()).toBe('/models/:id');
    });

    it('Should get a model with getHandler method', async () => {
        const handler = getModelRoute.getHandler();
        await handler(req, res);

        expect(GetModelUseCase.execute).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockOutput);
    });
})

describe('getModelByCategory', () => {
    const date = new Date();
    const mockOutput = [
        { id: '123', modelName: 'model', category: 'category', description: 'description', accuracy: 0.9, parameters: [], favoritedBy: [], favoritesCount: 0, createdAt: date, updatedAt: date},
        { id: '1234', modelName: 'model', category: 'category', description: 'description', accuracy: 0.9, parameters: [], favoritedBy: [], favoritesCount: 0, createdAt: date, updatedAt: date}
    ];
    // Mocking the GetModelByCategory execute method
    GetModelsByCategoryUseCase.execute = jest.fn();
    GetModelsByCategoryUseCase.execute.mockResolvedValue(mockOutput);

    const req = { 
        params: { category: 'category' }
    } as unknown as Request;
    const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
    } as unknown as Response;

    // Route
    const getModelsByCategoryRoute = GetModelsByCategoryRoute.create(GetModelsByCategoryUseCase);

    it('Should get the handler api method with getMethod method', () => {
        expect(getModelsByCategoryRoute.getMethod()).toBe('get');
    });
    
    it("Should get the handler api path with getPath method", () => {
        expect(getModelsByCategoryRoute.getPath()).toBe('/models/category/:category');
    });

    it('Should get models by category with getHandler method', async () => {
        const handler = getModelsByCategoryRoute.getHandler();
        await handler(req, res);

        expect(GetModelsByCategoryUseCase.execute).toHaveBeenCalledWith('category');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockOutput);
    });
});

describe('createModel', () => {
    const mockOutput = { id: '123' };
    // Mocking the CreateModel execute method
    CreateModelUseCase.execute = jest.fn();
    CreateModelUseCase.execute.mockResolvedValue(mockOutput);

    const InputCreateModel = {
        modelName: "Model Test Create Model",
        description:'Model Test Description',
        category: 'Test',
        accuracy: 0.885,
        parameters: [
            {
            name: "Attribute 1",
            type: typeParameter.Number,
            },
        ]
    }

    const req = { 
        body: InputCreateModel
    } as unknown as Request;
    const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
    } as unknown as Response;

    // Route
    const createModelRoute = CreateModelRoute.create(CreateModelUseCase);

    it('Should get the handler api method with getMethod method', () => {
        expect(createModelRoute.getMethod()).toBe('post');
    });
    
    it("Should get the handler api path with getPath method", () => {
        expect(createModelRoute.getPath()).toBe('/models');
    });

    it('Should create a model with getHandler method', async () => {
        const handler = createModelRoute.getHandler();
        await handler(req, res);

        expect(CreateModelUseCase.execute).toHaveBeenCalledWith(InputCreateModel);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockOutput);
    });
})

