import { CredentialsSignin } from "next-auth";

class InvalidCredentials extends CredentialsSignin {
    code = "INVALID_CREDENTIALS";
}

export {InvalidCredentials};