export namespace AppError {
    export class UnexpectedError extends Error {
        private _errorCode: string = "UNEXPECTED_ERROR";
        private _message: string;
        private _statusCode: number = 500;

        constructor(){
            let message = "Internal Server Error";
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
