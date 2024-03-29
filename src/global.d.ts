declare namespace Express {
    interface Response {
        sendResponse: (status: number, data: any, message: string) => void;
    }
}