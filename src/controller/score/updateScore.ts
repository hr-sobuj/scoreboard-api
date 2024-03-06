import type { Request, Response } from "express";
import { ScoreModel } from "../../model/scoreModel";

export const updateScore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const result = await ScoreModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    );
    if (result) {
      res.status(201).json({
        data: result,
      });
    } else {
      res.status(500).json({
        msg: "Updation failed!",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      msg: "Updation failed!",
    });
  }
};
