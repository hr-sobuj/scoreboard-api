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
export const deleteScore: RequestHandler<RequestBody> = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ScoreModel.findByIdAndDelete({ _id: id });
        if(result){
            res.status(201).json({
                msg:"Deleted!"
            });
        }else{
            res.status(201).json({
                msg:"Deletion failed!"
            });
        }
    } catch (error: any) {
        res.status(500).json({
            msg: "Creation failed!"
        })
    }
}