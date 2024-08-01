import User from "../../src/domain/User";
import BcryptEncryptService from "../../src/infra/services/BcryptEncryptService";

describe("User unit tests",  () => {
    const inputCreateUser = {
        name: "User",
        lastName: "Test",
        email: "email@test.com",
        password: "123456",
    }

    const encryptService = new BcryptEncryptService();

    // This user is created to be used in some tests
    let user: User;
    beforeAll(async () => {
        user = await User.create(inputCreateUser.name, inputCreateUser.lastName, inputCreateUser.email, inputCreateUser.password, encryptService);
    });
    
    // Here we're also testing the get methods
    it("Should create a user", async () => {
        expect(user.userId).toBeDefined();
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
            expect.assertions(1);
            try {
                await User.create("", inputCreateUser.lastName, inputCreateUser.email, inputCreateUser.password, encryptService);
            } catch (error) {
                expect(error.message).toBe('Name is required');
            };
        });
        it("Should throw an error when the user email is empty", async () => {
            expect.assertions(1);
            try {
                await User.create(inputCreateUser.name, inputCreateUser.lastName, "", inputCreateUser.password, encryptService);
            } catch (error) {
                expect(error.message).toBe("Email is required");
            };
        });

        it("Should throw an error when the user password is empty", async () => {
            expect.assertions(1);
            try {
                await User.create(inputCreateUser.name, inputCreateUser.lastName, inputCreateUser.email, "", encryptService);
            } catch (error) {
                expect(error.message).toBe("Password is required");
            };
        });

        it("Should throw an error when the user password is wrong", async () => {
            expect.assertions(1);
            try {
                const user = await User.create(inputCreateUser.name, inputCreateUser.lastName, inputCreateUser.email, "password", encryptService);
                await user.validatePassword("wrongPassword", encryptService);
            } catch (error) {
                expect(error.message).toBe("Invalid password");
            };
        });
        
    });
});
    