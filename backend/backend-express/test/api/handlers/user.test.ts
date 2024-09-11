import { Request, Response } from "express";
// Importing routes
import GetUserRoute from './../../../src/infra/api/express/routes/user/GetUser.express.route';
import CreateUserRoute from './../../../src/infra/api/express/routes/user/CreateUser.express.route.ts';
import AuthenticateUserRoute from './../../../src/infra/api/express/routes/user/AuthenticateUser.express.route.ts';
import FavoriteModelRoute from './../../../src/infra/api/express/routes/user/FavoriteModel.express.route';
import UnfavoriteModelRoute from '../../../src/infra/api/express/routes/user/UnfavoriteModel.express.route.ts';
import ObtainModelPredictionRoute from '../../../src/infra/api/express/routes/user/ObtainModelPrediction.route.ts';
// Mocking usecases
const GetUserUseCase = require('../../../src/application/usecase/GetUser.ts')
const CreateUserUseCase = require('../../../src/application/usecase/CreateUser.ts')
const AuthenticateUserUseCase = require('../../../src/application/usecase/AuthenticateUser.ts')
const FavoriteModelUseCase = require('../../../src/application/usecase/FavoriteModel')
const UnfavoriteModelUseCase = require('../../../src/application/usecase/UnfavoriteModel')
const ObtainModelPredictionUseCase = require('../../../src/application/usecase/ObtainModelPrediction.ts')
// Mocking the user usecases
jest.mock('../../../src/application/usecase/GetUser.ts')
jest.mock('../../../src/application/usecase/CreateUser.ts')
jest.mock('../../../src/application/usecase/AuthenticateUser.ts')
jest.mock('../../../src/application/usecase/FavoriteModel')
jest.mock('../../../src/application/usecase/UnfavoriteModel')

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

    it('Should get a user with getHandler method', async () => {
        const handler = getUserRoute.getHandler();
        expect(handler).toBeDefined()
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

    it('Should create a user with getHandler method', async () => {
        const handler = createUserRoute.getHandler();
        expect(handler).toBeDefined()
    });
})

describe('authenticateUser', () => {
    const mockOutput = { token: "12345" };
    // Mocking the GetModel execute method
    AuthenticateUserUseCase.execute = jest.fn();
    AuthenticateUserUseCase.execute.mockResolvedValue(mockOutput);

    const InputAuthenticateUser = {
        email: "user@gmail.com",
        password: "1234"
    }

    const req = { 
        body: InputAuthenticateUser
    } as unknown as Request;
    const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
    } as unknown as Response;

    // Route
    const authenticateUserRoute = AuthenticateUserRoute.create(AuthenticateUserUseCase);

    it('Should get the route api method with getMethod method', () => {
        expect(authenticateUserRoute.getMethod()).toBe('post');
    });
    
    it("Should get the handler api path with getPath method", () => {
        expect(authenticateUserRoute.getPath()).toBe('/auth/login');
    });

    it('Should get authenticate a user with getHandler method', async () => {
        const handler = authenticateUserRoute.getHandler();
        expect(handler).toBeDefined()
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
        params: InputFavoriteModel
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

    it('Should favorite a model with getHandler method', async () => {
        const handler = favoriteModelRoute.getHandler();
        expect(handler).toBeDefined()
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
        params: InputUnfavoriteModel
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

    it('Should unfavorite a model with getHandler method', async () => {
        const handler = unfavoriteModelRoute.getHandler();
        expect(handler).toBeDefined()
    });
})

describe('ObtainModelPrediction', () => {
    const mockOutput = Promise.resolve();
    // Mocking the CreateModel execute method
    ObtainModelPredictionUseCase.execute = jest.fn();
    ObtainModelPredictionUseCase.execute.mockResolvedValue(mockOutput);

    const inputObtainModelPrediction = {
        userId: '1234',
        modelId: '12345',
        parameters: [
            {
                name: "gender",
                value: false,
            },
            {
                name: "age",
                value: "59",
            },
            {
                name: "smoker",
                value: false,
            },
            {
                name: "yellow_fingers",
                value: false,
            },
            {
                name: "anxiety",
                value: false,
            },
            {
                name: "peer_pressure",
                value: true,
            },
            {
                name: "chronic_disease",
                value: false,
            },
            {
                name: "fatigue",
                value: true,
            },
            {
                name: "allergy",
                value: false,
            },
            {
                name: "wheezing",
                value: true,
            },
            {
                name: "alcohol_consume",
                value: false,
            },
            {
                name: "coughing",
                value: true,
            },
            {
                name: "shortness_of_breath",
                value: true,
            },
            {
                name: "swallowing_difficulty",
                value: false,
            },
            {
                name: "chest_pain",
                value: true,
            },
        ],
    }

    const req = { 
        params: inputObtainModelPrediction
    } as unknown as Request;
    const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
    } as unknown as Response;

    // Route
    const obtainModelPredictionRoute = ObtainModelPredictionRoute.create(ObtainModelPredictionUseCase);

    it('Should get the handler api method with getMethod method', () => {
        expect(obtainModelPredictionRoute.getMethod()).toBe('post');
    });
    
    it("Should get the handler api path with getPath method", () => {
        expect(obtainModelPredictionRoute.getPath()).toBe('/users/:userId/prediction/:modelId');
    });

    it('Should unfavorite a model with getHandler method', async () => {
        const handler = obtainModelPredictionRoute.getHandler();
        expect(handler).toBeDefined()
    });
})