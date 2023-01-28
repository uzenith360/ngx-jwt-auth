export default class HttpError extends Error {
    code?: number | undefined;
    constructor(status: string, code?: number | undefined);
}
