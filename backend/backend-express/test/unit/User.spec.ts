import User from "../../src/domain/User";

describe("User unit tests", () => {
    const inputCreateUser = {
        name: "User",
        lastName: "Test",
        email: "email@test.com",
        password: "123456",
    }
    
    // This user is created to be used in some tests
    const user = User.create(inputCreateUser.name, inputCreateUser.lastName, inputCreateUser.email, inputCreateUser.password);
    
    // Here we're also testing the get methods
    it("Should create a user", () => {
        expect(user.userId).toBeDefined();
        expect(user.getName()).toBe(inputCreateUser.name);
        expect(user.getEmail()).toBe(inputCreateUser.email);
        expect(user.getPassword()).toBe(inputCreateUser.password);
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
        it("Should throw an error when the user name is empty", () => {
            expect(() => {
                User.create("", inputCreateUser.lastName, inputCreateUser.email, inputCreateUser.password);
            }).toThrow("Name is required");
        });
        it("Should throw an error when the user email is empty", () => {
            expect(() => {
                User.create(inputCreateUser.name, inputCreateUser.lastName, "", inputCreateUser.password);
            }).toThrow("Email is required");
        });
        it("Should throw an error when the user password is empty", () => {
            expect(() => {
                User.create(inputCreateUser.name, inputCreateUser.lastName, inputCreateUser.email, "");
            }).toThrow("Password is required");
        });
    });
});
    