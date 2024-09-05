import crypto from 'crypto';
import CreateUser from '../../src/application/usecase/CreateUser';
import GetUser from '../../src/application/usecase/GetUser';
import { PrismaClientAdapter } from '../../src/infra/database/PrismaClientAdapter';
import UserRepositoryDatabase from '../../src/infra/repository/UserRepositoryDatabase';
import BcryptEncryptService from '../../src/infra/services/BcryptEncryptService';
import NotFoundError from '../../src/application/errors/NotFound.error';

it("Should get a user", async () => {
    // Dependencies 
    const connection = new PrismaClientAdapter();
    const userRepository = new UserRepositoryDatabase(connection);
    const encryptService = new BcryptEncryptService();
    // Creating a user to get after
    const createUser = new CreateUser(userRepository, encryptService, connection);
    const inputCreateUser = {
        name: "User",
        lastName: "Test",
        email: `${crypto.randomBytes(10).toString('hex')}@test.com`,
        password: "123456",
    }
    const outputCreateUser = await createUser.execute(inputCreateUser);
    // Getting the user
    const getUser = new GetUser(connection);
    if(outputCreateUser.isRight()){
        const outputGetUser = await getUser.execute(outputCreateUser.value.id);
        if(outputCreateUser.isRight() && outputGetUser.isRight()){
            expect(outputGetUser.value.id).toEqual(outputCreateUser.value.id)
        }
    }
})

it("Should throw a error if the user doesn't exists", async () => {
    // Dependencies 
    const connection = new PrismaClientAdapter();
    // Getting the user
    const getUser = new GetUser(connection);
    const outputGetUser = await getUser.execute("invalid_id");
    if(outputGetUser.isLeft()){
        expect(outputGetUser.value).toBeInstanceOf(NotFoundError)
    }
});