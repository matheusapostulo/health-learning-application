import User from "../../src/domain/User";

describe("User unit tests", () => {
    const inputCreateUser = {
        name: "User Test",
        email: "email@test.com",
        password: "123456",
    }
    
    it("Should create a user", () => {
        const user = User.create(inputCreateUser.name, inputCreateUser.email, inputCreateUser.password);
        expect(user.userId).toBeDefined();
        expect(user.name).toBe(inputCreateUser.name);
        expect(user.email).toBe(inputCreateUser.email);
        expect(user.password).toBe(inputCreateUser.password);
        expect(user.getFavoriteModels()).toStrictEqual([]);
    });

    describe("User get tests", () => {
        it("Should return the favorite models", () => {});
    });
    
    describe("User add tests", () => {
        it("Should add a model to favorites", () => {})
    });

    describe("User remove tests", () => {
        it("Should remove a model from favorites", () => {});
    });
    
    describe("User edit tests", () => {
        it("Should edit user name", () => {});
    });

    describe("User throw error tests", () => {
        it("Should throw an error when the user name is empty", () => {});
        it("Should throw an error when the user email is empty", () => {});
        it("Should throw an error when the user password is empty", () => {});
        
    });
});
    