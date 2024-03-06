import { Router } from "express";
import { createScore } from "../controller/score/createScore";
import { deleteScore } from "../controller/score/deleteScore";
import { getAllScore } from "../controller/score/getAllScore";
import { getScore } from "../controller/score/getScore";
import { updateScore } from "../controller/score/updateScore";
import { authGuard } from "../middlewares/common/authGuard";
import {
  scoreErrorHandler,
  scoreValidator,
} from "../middlewares/score/scoreValidator";

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
