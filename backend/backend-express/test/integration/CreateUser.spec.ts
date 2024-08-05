import CreateUser from "../../src/application/usecase/CreateUser";
import { PrismaClientAdapter } from "../../src/infra/database/PrismaClientAdapter";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";
import BcryptEncryptService from "../../src/infra/services/BcryptEncryptService";
import crypto from "crypto";

it("Should create a User in database", async () => {
    const connection = new PrismaClientAdapter();
    const userRepository = new UserRepositoryDatabase(connection);
    const encryptService = new BcryptEncryptService();

    const createUser = new CreateUser(userRepository, encryptService, connection);

    const inputCreateUser = {
        name: "User",
        lastName: "Test",
        email: `${crypto.randomBytes(10).toString('hex')}@test.com`,
        password: "123456",
    }

    const outputCreateUser = await createUser.execute(inputCreateUser);

    expect(outputCreateUser.id).toBeDefined();

    connection.close();
})

it("Shouldn't create a user if the email already exists ", async () => { 

});