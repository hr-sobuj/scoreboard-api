"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScore = exports.updateScore = exports.getScore = exports.getAllScore = exports.createScore = void 0;
const createAsync_1 = __importDefault(require("../../../shared/createAsync"));
const score_model_1 = require("./score.model");
exports.createScore = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newScore = new score_model_1.ScoreModel(req.body);
    yield newScore.save();
    if (newScore) {
        res.status(200).json({
            msg: "New score added!",
            data: newScore,
        });
    }
}));
/*
|--------------------------------------------------------------------------
| Update score
|--------------------------------------------------------------------------
*/
exports.getAllScore = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield score_model_1.ScoreModel.find({}, '-createdAt -updatedAt -__v');
    if (result) {
        res.status(201).json({
            data: result,
        });
    }
    else {
        res.status(500).json({
            msg: "Operation failed!"
        });
    }
}));
/*
|--------------------------------------------------------------------------
| Update score
|--------------------------------------------------------------------------
*/
exports.getScore = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield score_model_1.ScoreModel.findOne({ _id: id }, '-createdAt -updatedAt -__v');
    if (result) {
        res.status(201).json({
            data: result,
        });
    }
    else {
        res.status(500).json({
            msg: "Operation failed!"
        });
    }
}));
exports.updateScore = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield score_model_1.ScoreModel.findByIdAndUpdate({ _id: id }, {
        $set: Object.assign({}, req.body),
    }, {
        new: true,
    });
    if (result) {
        res.status(201).json({
            data: result,
        });
    }
    else {
        res.status(500).json({
            msg: "Updation failed!",
        });
    }
}));
exports.deleteScore = (0, createAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield score_model_1.ScoreModel.findByIdAndDelete({ _id: id });
    if (result) {
        res.status(204).json({
            msg: "Deleted!",
        });
    }
    else {
        res.status(400).json({
            msg: "Deletion failed!",
        });
    }
}));
