export namespace AuthenticateUserError {
    export class InvalidPasswordError extends Error {
        private _errorCode: string = "INVALID_PASSWORD";
        private _message: string;
        private _statusCode: number = 400;

        constructor(){
            let message = "Invalid password";
            super(message);
            this._message = message;
        }

        get errorCode(){
            return this._errorCode;
        }

        get message(){
            return this._message;
        }
        
        get statusCode(){
            return this._statusCode;
        }
    }

    export class InvalidTokenError extends Error {
        private _errorCode: string = "INVALID_TOKEN";
        private _message: string;
        private _statusCode: number = 401;

        constructor(){
            let message = "Invalid token";
            super(message);
            this._message = message;
        }

        get errorCode(){
            return this._errorCode;
        }

        get message(){
            return this._message;
        }
        
        get statusCode(){
            return this._statusCode;
        }
    }

    export class NotFoundTokenError extends Error {
        private _errorCode: string = "NOT_FOUND_TOKEN";
        private _message: string;
        private _statusCode: number = 400;

        constructor(){
            let message = "Token was not sent";
            super(message);
            this._message = message;
        }

        get errorCode(){
            return this._errorCode;
        }

        get message(){
            return this._message;
        }
        
        get statusCode(){
            return this._statusCode;
        }
    }
}