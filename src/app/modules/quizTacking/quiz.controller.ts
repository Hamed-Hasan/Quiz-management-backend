

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { QuizService } from './quiz.service';

export const QuizController = {
  startQuiz: catchAsync(async (req: Request, res: Response) => {
    const quizId = req.params.id;
    // Fetch quiz details and generate random questions (add your logic here)
    const quizData = await QuizService.startQuizForUser(quizId, req.user?.id);
    sendResponse(res, { statusCode: 200, success: true, data: quizData });
  }),

  submitAnswer: catchAsync(async (req: Request, res: Response) => {
    const quizId = req.params.id;
    const userId = req.user?.id || '';
    const { questionId, selectedOptionId } = req.body;

    // Validate and process the submitted answer
    const result = await QuizService.submitAnswer(quizId, userId, questionId, selectedOptionId);

    sendResponse(res, { statusCode: 200, success: true, data: result });
  }),
};
