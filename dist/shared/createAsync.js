"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createAsync(handler) {
    return (req, res, next) => {
        try {
            handler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = createAsync;
