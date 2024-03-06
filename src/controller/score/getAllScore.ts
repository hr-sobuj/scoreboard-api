import type { ScoreTypes } from "../../types/scoreTypes";
import type { Request, RequestHandler } from "express";
import { ScoreModel } from '../../model/scoreModel';

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
        const result = await ScoreModel.find({},'-createdAt -updatedAt -__v');
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