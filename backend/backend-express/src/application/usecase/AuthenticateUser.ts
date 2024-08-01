import DatabaseConnection from "../ports/database/DatabaseConnection";

export default class AuthenticateUser {

    constructor(readonly connection: DatabaseConnection) {
    }

    async execute(input: InputAuthenticateUser): Promise<OutputAuthenticateUser> {
        
        return {

        }
    }
}

interface InputAuthenticateUser {
    email: string,
    password: string,
}

interface OutputAuthenticateUser {
    token: string;
}