export namespace CreateUserError {
    export class UserAlreadyExistsError extends Error {
        private _message: string;
        private _statusCode: number = 400;

        constructor(email: string){
            let message = `User with email '${email}' already exists`;
            super(message);
            this._message = message;
        }

        get message(){
            return this._message;
        }
        
        get statusCode(){
            return this._statusCode;
        }
    }
}