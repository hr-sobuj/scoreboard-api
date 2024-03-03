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
export const getAllScore: RequestHandler<RequestBody> = async (req, res) => {
    try {
        const result = await ScoreModel.find({},'-createdAt -updatedAt -_id -__v');
        log(result);
        if(result){
            res.status(201).json({
                data:result,
            })
        }else{
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