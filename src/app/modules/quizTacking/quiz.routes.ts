import express from 'express';
import { QuizController } from './quiz.controller';
import validateRequest from '../../middlewares/validateRequest';
import { QuizValidationSchema } from './quiz.validation';
import { authenticateUser } from '../../../helpers/authenticateUser';

const router = express.Router();

// Apply the authentication middleware to all routes in this router
router.use(authenticateUser);

router.get('/:id/start', QuizController.startQuiz);

router.post(
  '/:id/submit',
  authenticateUser,
  validateRequest(QuizValidationSchema.submitAnswerZodSchema),
  QuizController.submitAnswer
);

export const QuizTacking = router;
