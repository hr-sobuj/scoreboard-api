import type { Document } from "mongoose";
import type { ScoreTypes } from "../../types/scoreTypes";
import type { Request, RequestHandler } from "express";
import { ScoreModel } from '../../model/scoreModel';
import { log } from "console";

interface RequestBody extends Request {
    body: ScoreTypes,
    id: string
}

/*
|--------------------------------------------------------------------------
| Update score
|--------------------------------------------------------------------------
*/
export const updateScore: RequestHandler<RequestBody> = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ScoreModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                ...req.body
            }
        }, {
            new: true
        });
        if(result){
            res.status(201).json({
                msg:"Updated!",
                data:result,
            })
        }
    } catch (error: any) {
        res.status(500).json({
            msg: "Creation failed!"
        })
    }
}