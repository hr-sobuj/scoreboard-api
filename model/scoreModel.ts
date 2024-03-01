import { Document, Schema, model } from "mongoose";
import type { ScoreTypes } from '../types/scoreTypes';

/*
|--------------------------------------------------------------------------
| Schema Defination
|--------------------------------------------------------------------------
*/
export const scoreSchema = new Schema<ScoreTypes & Document>({
    name: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9]+$/
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
        enum: ['batting', 'balling'],
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