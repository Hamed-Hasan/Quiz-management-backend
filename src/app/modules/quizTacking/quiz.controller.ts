
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { QuizService } from './quiz.service';

export const QuizController = {
  startQuiz: catchAsync(async (req: Request, res: Response) => {
    // console.log('User Object:', req.user);
    const quizId = req.params.id;
    const quizData = await QuizService.startQuizForUser(quizId, req.user?.userId);
    sendResponse(res, { statusCode: 200, success: true, data: quizData });
  }),

  submitAnswer: catchAsync(async (req: Request, res: Response) => {
    // console.log('User Object:', req.user?.userId);
    const quizId = req.params.id;
    const userId = req.user?.userId || '';
    // console.log('UserIDs:', userId, 'QuizID:', quizId);
    const { questionId, selectedOptionId } = req.body;

    const result = await QuizService.submitAnswer(quizId, userId, questionId, selectedOptionId);

    sendResponse(res, { statusCode: 200, success: true, data: result });
  }),
};