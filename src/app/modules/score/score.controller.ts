import type { RequestHandler } from "express";
import { Request, Response } from "express";
import createAsync from "../../../shared/createAsync";
import { ScoreModel } from "./score.model";


export const createScore = createAsync(async (
    req: Request,
    res: Response
): Promise<void> => {
    const newScore = new ScoreModel(req.body);
    await newScore.save();
    if (newScore) {
        res.status(200).json({
            msg: "New score added!",
            data: newScore,
        });
    }
});

/*
|--------------------------------------------------------------------------
| Update score
|--------------------------------------------------------------------------
*/
export const getAllScore: RequestHandler = createAsync(async (req, res) => {
    const result = await ScoreModel.find({}, '-createdAt -updatedAt -__v');
    if (result) {
        res.status(201).json({
            data: result,
        })
    } else {
        res.status(500).json({
            msg: "Operation failed!"
        })
    }
});


/*
|--------------------------------------------------------------------------
| Update score
|--------------------------------------------------------------------------
*/
export const getScore: RequestHandler = createAsync(async (req, res) => {
    const id = req.params.id;
    const result = await ScoreModel.findOne({ _id: id }, '-createdAt -updatedAt -__v');

    if (result) {
        res.status(201).json({
            data: result,
        })
    } else {
        res.status(500).json({
            msg: "Operation failed!"
        })
    }
});


export const updateScore = createAsync(async (
    req: Request,
    res: Response
): Promise<void> => {
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

});


export const deleteScore = createAsync(async (
    req: Request,
    res: Response
): Promise<void> => {
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
});

