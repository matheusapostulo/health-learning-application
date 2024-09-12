export namespace CreateModelError {
    export class InvalidAccuracyError extends Error {
        private _errorCode: string = "INVALID_ACCURACY";
        private _message: string;
        private _statusCode: number = 400;

        constructor(message: string){
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


    export class InvalidParameterTypeError extends Error {
        private _errorCode: string = "INVALID_PARAMETER_TYPE";
        private _message: string;
        private _statusCode: number = 400;

        constructor(message: string){
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