export default class HttpError extends Error {
    constructor(status: string, public code?: number){
        super(status);
    }
}
