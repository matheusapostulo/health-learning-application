export namespace FavoriteModelError {
    export class UserAlreadyFavoritedError extends Error {
        private _errorCode: string = "USER_ALREADY_FAVORITED";
        private _message: string;
        private _statusCode: number = 400;

        constructor(){
            let message = "User already favorited this model";
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