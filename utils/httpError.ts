export class HttpError extends Error {
    public status

    constructor(message: string, status: any) {
        super(message)
        this.status = status
    }
}
