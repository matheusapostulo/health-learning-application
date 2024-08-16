export namespace AuthenticateUserError {
    export class InvalidPasswordError extends Error {
        private _message: string;
        private _statusCode: number = 400;

        constructor(){
            let message = "Invalid password";
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