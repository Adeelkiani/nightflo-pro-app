export class ExpoError{
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}