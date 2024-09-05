import RequiredParametersError from "../../src/application/errors/RequiredParameters.error";
import User from "../../src/domain/User";
import BcryptEncryptService from "../../src/infra/services/BcryptEncryptService";
import { AuthenticateUserError } from "../../src/application/errors/AuthenticateUser.error";

describe("User unit tests",  () => {
    const inputCreateUser = {
        name: "User",
        lastName: "Test",
        email: "email@test.com",
        password: "123456",
    }

    const encryptService = new BcryptEncryptService();

    // This user is created to be used in some tests
    let user;
    beforeAll(async () => {
        let userOrError = await User.create(inputCreateUser.name, inputCreateUser.lastName, inputCreateUser.email, inputCreateUser.password, encryptService);
        user = userOrError.value;
    });
    
    // Here we're also testing the get methods
    it("Should create a user", async () => {
        expect(user.id).toBeDefined();
        expect(user.getName()).toBe(inputCreateUser.name);
        expect(user.getEmail()).toBe(inputCreateUser.email);
        expect(await user.validatePassword(inputCreateUser.password, encryptService)).toBeTruthy();
        expect(user.getFavoriteModels()).toStrictEqual([]);
    });
    
    describe("User add tests", () => {
        it("Should add a model id to favorites", () => {
            user.addFavoriteModel("model1");
            expect(user.getFavoriteModels()).toStrictEqual(["model1"]);
        })

        it("Should add a prediction to user", () => {
            user.addPrediction("model1", "prediction1");
            let userPredictionModelId = user.getPredictions()[0]['modelId'];
            let userPredictionPrediction = user.getPredictions()[0]['predictionResult'];
            expect(userPredictionModelId).toBe("model1");
            expect(userPredictionPrediction).toBe("prediction1");
        });
    });

    describe("User remove tests", () => {
        it("Should remove a model from favorites", () => {
            user.addFavoriteModel("model2");
            user.removeFavoriteModel("model1");
            expect(user.getFavoriteModels()).toStrictEqual(["model2"]);
        });
    });
    
    describe("User update tests", () => {
        it("Should update user name", () => {
            user.updateName("New Name");
            expect(user.getName()).toBe("New Name");
        });
        it("Should update last name", () => {
            user.updateLastName("New Last Name");
            expect(user.getLastName()).toBe("New Last Name");
        });
        it("Should update user email", () => {
            user.updateEmail("abc@gmail.com");
            expect(user.getEmail()).toBe("abc@gmail.com");
        });
        it("Should update user password", () => {
            user.updatePassword("123");
            expect(user.getPassword()).toBe("123");
        });
    });

    describe("User throw errors when create", () => {
        it("Should throw an error when the user name is empty", async () => {
            const outputCreateUser = await User.create("", inputCreateUser.lastName, inputCreateUser.email, inputCreateUser.password, encryptService);;

            expect(outputCreateUser.value).toBeInstanceOf(RequiredParametersError); 
            
        });
        it("Should throw an error when the user email is empty", async () => {
            const outputCreateUser = await User.create(inputCreateUser.name, inputCreateUser.lastName, "", inputCreateUser.password, encryptService);
            expect(outputCreateUser.value).toBeInstanceOf(RequiredParametersError); 
        });

        it("Should throw an error when the user password is empty", async () => {
            const outputCreateUser = await User.create(inputCreateUser.name, inputCreateUser.lastName, inputCreateUser.email, "", encryptService);
            expect(outputCreateUser.value).toBeInstanceOf(RequiredParametersError);
        });

        it("Should throw an error when the user password is wrong", async () => {
            const validPasswordOrError = await user.validatePassword("wrongPassword", encryptService);
            if(validPasswordOrError.isLeft()){
                expect(validPasswordOrError.value).toBeInstanceOf(AuthenticateUserError.InvalidPasswordError);
            }
        });
        
    });
});
    