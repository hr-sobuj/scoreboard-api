import { Document, Schema, model } from "mongoose";
import type { ScoreTypes } from './score.interface';

/*
|--------------------------------------------------------------------------
| Schema Defination
|--------------------------------------------------------------------------
*/
export const scoreSchema = new Schema<ScoreTypes & Document>({
    name: {
        type: String,
        required: true,
    },
    b4: {
        type: Number,
        required: true,
    },
    b6: {
        type: Number,
        required: true
    },
    totalRun: {
        type: Number,
        required: true
    },
    totalBall: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['bat', 'ball'],
        required: true
    }
}, {
    timestamps: true
});


/*
|--------------------------------------------------------------------------
| Create Score Model
|--------------------------------------------------------------------------
*/
export const ScoreModel = model<Document>('score', scoreSchema);