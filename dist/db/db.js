"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envConfig_1 = require("../config/envConfig");
function dbConnection(app) {
    try {
        mongoose_1.default
            .connect(envConfig_1.NODE_ENV === 'development' ? envConfig_1.MONGO_CONNECTION_STRING_DEVELOPMENT : envConfig_1.MONGO_CONNECTION_STRING_PRODUCTION)
            .then(() => {
            console.log("DB Connected!");
            app.listen(envConfig_1.PORT, () => console.log(`Server is running at http://localhost:${envConfig_1.PORT}`));
        })
            .catch((error) => {
            console.log(error);
        });
    }
    catch (error) {
        console.log("Failed to connect database", error);
    }
}
exports.dbConnection = dbConnection;
