import { CreateUserError } from "../../src/application/errors/CreateUser.error";
import CreateUser, { ResponseCreateUser } from "../../src/application/usecase/CreateUser";
import { PrismaClientAdapter } from "../../src/infra/database/PrismaClientAdapter";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";
import BcryptEncryptService from "../../src/infra/services/BcryptEncryptService";
import crypto from "crypto";

// It'll be used for both tests
const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
const inputCreateUser = {
    name: "User",
    lastName: "Test",
    email: randomEmail,
    password: "123456",
}
const connection = new PrismaClientAdapter();
const userRepository = new UserRepositoryDatabase(connection);
const encryptService = new BcryptEncryptService();

it("Should create a User in database", async () => {
    const createUser = new CreateUser(userRepository, encryptService, connection);

    const outputCreateUser: ResponseCreateUser = await createUser.execute(inputCreateUser);

    await connection.close();

    if (outputCreateUser.isRight()) {
        expect(outputCreateUser.value.id).toBeDefined();
    }
})

it("Shouldn't create a user if the email already exists ", async () => { 
    const createUser = new CreateUser(userRepository, encryptService, connection); 
    await createUser.execute(inputCreateUser);
    const outputCreateUser: ResponseCreateUser = await createUser.execute(inputCreateUser);

    expect(outputCreateUser.value).toBeInstanceOf(CreateUserError.UserAlreadyExistsError);
    
});