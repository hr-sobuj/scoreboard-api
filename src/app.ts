import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./route/authRoute";
import scoreRoute from "./route/scoreRoute";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/common/errorHandler";
import { MONGO_CONNECTION_STRING_DEVELOPMENT, MONGO_CONNECTION_STRING_PRODUCTION, NODE_ENV, PORT } from "./config/envConfig";


const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE"],
  maxAge: 3600000,
};

app.use(cors(corsOptions));

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/score", scoreRoute);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
