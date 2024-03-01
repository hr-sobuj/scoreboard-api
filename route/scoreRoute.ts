import { createScore } from '../controller/score/createScore';
import { deleteScore } from '../controller/score/deleteScore';
import { updateScore } from '../controller/score/updateScore';
import { authGuard } from '../middlewares/common/authGuard';
import { scoreErrorHandler, scoreValidator } from '../middlewares/score/scoreValidator';
/*
|--------------------------------------------------------------------------
| Import Dependencies
|--------------------------------------------------------------------------
*/
const express = require('express');

/*
|--------------------------------------------------------------------------
| Sub Route
|--------------------------------------------------------------------------
*/
const route = express.Router();

/*
|--------------------------------------------------------------------------
| Create score Route
|--------------------------------------------------------------------------
*/
route.post('/create', authGuard,scoreValidator,scoreErrorHandler, createScore);

/*
|--------------------------------------------------------------------------
| Update score Route
|--------------------------------------------------------------------------
*/
route.put('/update/:id', authGuard, updateScore);

/*
|--------------------------------------------------------------------------
| Update score Route
|--------------------------------------------------------------------------
*/
route.delete('/delete/:id', authGuard, deleteScore);

module.exports = route;