export default class NotFoundError extends Error {
    private _errorCode: string = "NOT_FOUND";
    private _message: string;
    private _statusCode: number = 404;

    constructor(param: string){
        let message = `'${param}' not found`;
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