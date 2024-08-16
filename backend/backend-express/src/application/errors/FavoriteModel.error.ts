export namespace FavoriteModelError {
    export class UserAlreadyFavoritedError extends Error {
        private _message: string;
        private _statusCode: number = 400;

        constructor(){
            let message = "User already favorited this model";
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