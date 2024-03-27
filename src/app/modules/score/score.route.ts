import { Router } from "express";
import { scoreErrorHandler, scoreValidator } from "../../middlewares/score/scoreValidator";
import { authGuard } from "../../middlewares/shared/authGuard";
import { createScore, deleteScore, getAllScore, getScore, updateScore } from "./score.controller";

const route = Router();

route.get("/:id", getScore);

route.get("/get/all", getAllScore);

route.post(
    "/create",
    authGuard,
    scoreValidator,
    scoreErrorHandler,
    createScore
);

route.put("/update/:id", authGuard, updateScore);

route.delete("/delete/:id", authGuard, deleteScore);

export default route;
