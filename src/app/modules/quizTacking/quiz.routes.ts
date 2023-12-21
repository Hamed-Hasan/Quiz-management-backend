// quiz.routes.ts

import express from 'express';
import { QuizController } from './quiz.controller';
import validateRequest from '../../middlewares/validateRequest';
import { QuizValidationSchema } from './quiz.validation';


const router = express.Router();

router.get('/:id/start', QuizController.startQuiz);

router.post(
  '/:id/submit',
  validateRequest(QuizValidationSchema.submitAnswerZodSchema),
  QuizController.submitAnswer
);

export const QuizTacking = router;
