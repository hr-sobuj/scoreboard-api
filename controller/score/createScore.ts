import type { ScoreTypes } from "../../types/scoreTypes";
import type { Request, RequestHandler } from "express";
import { ScoreModel } from "../../model/scoreModel";
import { log } from "console";

interface RequestBody extends Request {
    body: ScoreTypes,
}

/*
|--------------------------------------------------------------------------
| Create new score
|--------------------------------------------------------------------------
*/
export const createScore: RequestHandler<RequestBody> = async (req,res) => {
    try {
        const newScore=new ScoreModel(req.body);
        await newScore.save();
        if(newScore){
            res.status(200).json({
                msg:"New score added!",
                data:newScore
            });
        }
    } catch (error:any) {
        log(error.message)
        res.status(500).json({
            msg:"Creation failed!"
        })
    }
}