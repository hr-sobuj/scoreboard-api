import type { Request, Response } from "express";
import { ScoreModel } from "../../model/scoreModel";

export const deleteScore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const result = await ScoreModel.findByIdAndDelete({ _id: id });
    if (result) {
      res.status(204).json({
        msg: "Deleted!",
      });
    } else {
      res.status(400).json({
        msg: "Deletion failed!",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      msg: "Creation failed!",
    });
  }
};
