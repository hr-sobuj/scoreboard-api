import mongoose from "mongoose";
import { MONGO_CONNECTION_STRING_DEVELOPMENT, MONGO_CONNECTION_STRING_PRODUCTION, NODE_ENV, PORT } from "../config/envConfig";


export function dbConnection(app: any) {
    try {
        mongoose
            .connect(
                NODE_ENV === 'development' ? MONGO_CONNECTION_STRING_DEVELOPMENT : MONGO_CONNECTION_STRING_PRODUCTION
            )
            .then(() => {
                console.log("DB Connected!");
                app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log("Failed to connect database", error);
    }
}