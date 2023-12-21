import express from 'express';
import { QuizController } from './quiz.controller';
import { QuizValidationSchema } from './quiz.validation'; 
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(QuizValidationSchema.createQuizZodSchema),
  QuizController.createQuiz
);

router.put(
  '/:id',
  validateRequest(QuizValidationSchema.editQuizZodSchema),
  QuizController.editQuiz
);

router.delete('/:id', QuizController.deleteQuiz);

export const QuizRoutes = router;
