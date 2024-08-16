export default class RequiredParametersError extends Error {
    private _message: string;
    private _statusCode: number = 400;

    constructor(parameter: string){
        let message = `Parameter '${parameter}' is required`;
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

