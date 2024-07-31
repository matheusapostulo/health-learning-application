import CreateUser from "../../src/application/usecase/CreateUser";
import { PrismaClientAdapter } from "../../src/infra/database/PrismaClientAdapter";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";

it("Should create a User in database", async () => {
    const connection = new PrismaClientAdapter();
    const userRepository = new UserRepositoryDatabase(connection);

    const createUser = new CreateUser(userRepository);

    const inputCreateUser = {
        name: "User Test",
        email: "email@test.com",
        password: "123456",
    }

    const outputCreateUser = await createUser.execute(inputCreateUser);

    expect(outputCreateUser.userId).toBeDefined();

    connection.close();
})