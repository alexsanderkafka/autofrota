import { HttpError } from "routing-controllers";

export default class NotFound extends HttpError{
    private msg: string;

    constructor(msg: string) {
        super(404);
        this.msg = msg;
        Object.setPrototypeOf(this, NotFound.prototype);
    }

    toJSON() {
        return {
            timestamp: new Date(),
            statusCode: this.httpCode,
            message: this.msg,
        }
    }
}