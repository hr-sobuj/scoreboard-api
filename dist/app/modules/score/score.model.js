"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreModel = exports.scoreSchema = void 0;
const mongoose_1 = require("mongoose");
/*
|--------------------------------------------------------------------------
| Schema Defination
|--------------------------------------------------------------------------
*/
exports.scoreSchema = new mongoose_1.Schema({
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
exports.ScoreModel = (0, mongoose_1.model)('score', exports.scoreSchema);
