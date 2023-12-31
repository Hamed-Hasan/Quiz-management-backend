// quiz.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { QuizService } from './quiz.service';

export const QuizController = {
  createQuiz: catchAsync(async (req: Request, res: Response) => {
    const quizData = req.body;
    const createdQuiz = await QuizService.createQuiz(quizData);
    sendResponse(res, {
      message: 'Quiz Created successfully.',
      statusCode: 201,
      success: true,
      data: createdQuiz,
    });
  }),

  editQuiz: catchAsync(async (req: Request, res: Response) => {
    const quizId = req.params.id;
    const quizData = req.body;
    const editedQuiz = await QuizService.editQuiz(quizId, quizData);
    sendResponse(res, {
      message: 'Quiz Edited successfully.',
      statusCode: 200,
      success: true,
      data: editedQuiz,
    });
  }),

  deleteQuiz: catchAsync(async (req: Request, res: Response) => {
    const quizId = req.params.id;
    await QuizService.deleteQuiz(quizId);
    sendResponse(res, {
      message: 'Quiz deleted successfully.',
      statusCode: 200,
      success: true,
    });
  }),
};
