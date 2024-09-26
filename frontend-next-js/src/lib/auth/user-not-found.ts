import { CredentialsSignin } from "next-auth";

class UserNotFoundError extends CredentialsSignin {
    code = "USER_NOT_FOUND";
}

export {UserNotFoundError};