import { PrismaClientAdapter } from './../../../src/infra/database/PrismaClientAdapter';
import express, { Express } from 'express';
import GetModel from './../../../src/application/usecase/GetModel';
import GetModelRoute from './../../../src/infra/api/express/routes/model/GetModel.express.route';

describe('getModel', () => {
    // Dependecies
    const connection = new PrismaClientAdapter();
    const getModel = new GetModel(connection);
    const getModelRoute = GetModelRoute.create(getModel);

    it('Should get the handler api method with getMethod method', () => {
        expect(getModelRoute.getMethod()).toBe('get');
    });
    
    it("Should get the handler api path with getPath method", () => {
        expect(getModelRoute.getPath()).toBe('/model/:id');
    });

    it('Should get a model with getHandler method', () => {
        console.log(getModelRoute.getHandler());
        // expect(getModelRoute.getHandler()).toBe([Function anonymous]);
    });
})

describe('getModelByCategory', () => {
    it('', () => {
        expect(true).toBe(true);
    });
});

describe('createModel', () => {
    it('', () => {
        expect(true).toBe(true);
    });
})

describe('favoriteModel', () => {
    it('', () => {
        expect(true).toBe(true);
    });
})

describe('unfavoriteModel', () => {
    it('', () => {
        expect(true).toBe(true);
    });
})