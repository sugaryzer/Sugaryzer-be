export class ResponseError extends Error {
    public error: boolean;

    constructor(public status: number, public message: string) {
        super(message);
        this.error = true;
    }
}