import type { ScoreTypes } from "../../types/scoreTypes";
import type { Request, RequestHandler } from "express";
import { ScoreModel } from '../../model/scoreModel';

interface RequestBody extends Request {
    body: ScoreTypes,
    id: string
}

/*
|--------------------------------------------------------------------------
| Delete score
|--------------------------------------------------------------------------
*/
export const deleteScore: RequestHandler<RequestBody> = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ScoreModel.findByIdAndDelete({ _id: id });
        if(result){
            res.status(202).json({
                msg:"Deleted!"
            });
        }else{
            res.status(400).json({
                msg:"Deletion failed!"
            });
        }
    } catch (error: any) {
        res.status(500).json({
            msg: "Operation failed!"
        })
    }
}