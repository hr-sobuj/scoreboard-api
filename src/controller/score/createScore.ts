import { ScoreModel } from "../../model/scoreModel";
import { Request, Response } from "express";

export const createScore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newScore = new ScoreModel(req.body);
    await newScore.save();
    if (newScore) {
      res.status(200).json({
        msg: "New score added!",
        data: newScore,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      msg: "Creation failed!",
    });
  }
};
