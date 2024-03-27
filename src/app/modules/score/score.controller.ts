import type { RequestHandler } from "express";
import { Request, Response } from "express";
import type { RequestBody } from "./score.interface";
import { ScoreModel } from "./score.model";


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

/*
|--------------------------------------------------------------------------
| Update score
|--------------------------------------------------------------------------
*/
export const getAllScore: RequestHandler<RequestBody> = async (req, res) => {
    try {
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
    } catch (error: any) {
        res.status(500).json({
            msg: "Operation failed!"
        })
    }
}


/*
|--------------------------------------------------------------------------
| Update score
|--------------------------------------------------------------------------
*/
export const getScore: RequestHandler<RequestBody> = async (req, res) => {
    try {
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
    } catch (error: any) {
        res.status(500).json({
            msg: "Operation failed!"
        })
    }
}


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

