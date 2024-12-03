export class ResponseError extends Error {
    public error: boolean;
    public result: null;

    constructor(public status: number, public message: string) {
        super(message);
        this.error = true;
        this.result = null;
    }
}