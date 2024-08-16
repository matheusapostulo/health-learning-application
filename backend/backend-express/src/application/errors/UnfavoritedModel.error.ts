export namespace UnfavoriteModelError {
    export class UserFavoritesNotFoundError extends Error {
        private _message: string;
        private _statusCode: number = 400;

        constructor(){
            let message = "User does not have this model as favorite";
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