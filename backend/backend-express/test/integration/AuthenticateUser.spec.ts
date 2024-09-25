import { ResponseAuthenticateUser } from './../../src/application/usecase/AuthenticateUser';
import AuthenticateUser from "../../src/application/usecase/AuthenticateUser";
import { PrismaClientAdapter } from "../../src/infra/database/PrismaClientAdapter";
import crypto from "crypto";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";
import BcryptEncryptService from "../../src/infra/services/BcryptEncryptService";
import JsonwebtokenJwtService from "../../src/infra/services/JsonwebtokenJwtService";
import CreateUser from "../../src/application/usecase/CreateUser";

it("Should authenticate a user", async () => {
    // Dependencies implementations
    const connection = new PrismaClientAdapter();
    const userRepository = new UserRepositoryDatabase(connection);
    const encryptService = new BcryptEncryptService();
    const jwtService = new JsonwebtokenJwtService();
    // Instance of the use case
    const createUser = new CreateUser(userRepository, encryptService, connection);
    // Random email to avoid conflicts and compare with the authenticated user
    const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
    // Input to create a user
    const inputCreateUser = {
        name: "User",
        lastName: "Test",
        email: randomEmail,
        password: "123456",
    }
    // Execute the use case to create a user
    const outputCreateUser = await createUser.execute(inputCreateUser);
    // Instance of the authenticate use case
    const authenticateUser = new AuthenticateUser(connection, encryptService, userRepository, jwtService);
    // Input to authenticate a user
    if(outputCreateUser.isRight()){
        const inputAuthenticateUser = {
            userEmail: inputCreateUser.email,
            password: "123456"
        };
        
        // Execute the use case to authenticate a user
        const outputAuthenticateUser: ResponseAuthenticateUser = await authenticateUser.execute(inputAuthenticateUser);

        expect(outputAuthenticateUser.isRight()).toBeTruthy();
        
        // Close the connection after database operations
        await connection.close();
        
        // Check if the token is valid. It'll be useful to check if the user is authenticated in the future
        if(outputAuthenticateUser.isRight()){
            expect(outputAuthenticateUser.value.user).toBeDefined();
            expect(outputAuthenticateUser.value.token).toBeDefined();
            expect(outputAuthenticateUser.value.user.email).toBe(inputCreateUser.email);
            expect(await jwtService.checkToken(outputAuthenticateUser.value.token)).toBeTruthy();
        }
    }
});