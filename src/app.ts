import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import path from "path";
import { errorHandler, notFoundHandler } from "./app/middlewares/shared/errorHandler";
import { dbConnection } from "./db/db";
import rootRouter from './route/index';


const app = express();

// cors options
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE"],
  maxAge: 3600000,
};

app.use(cors(corsOptions));

// database connection
dbConnection(app);

// static files
app.use(express.static(path.join(__dirname, 'public')));


// rate limit 
const limiter = rateLimit({
  limit: 5000,
  windowMs: 15 * 60 * 1000,
  message: 'Too many request from your IP address. Thats why we blocked it',
});

app.use(limiter);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// route
app.use("/api/v1/", rootRouter);

// extra middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
