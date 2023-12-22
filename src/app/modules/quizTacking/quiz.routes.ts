import express from 'express';
import { QuizController } from './quiz.controller';
import validateRequest from '../../middlewares/validateRequest';
import { QuizValidationSchema } from './quiz.validation';
import { authenticateUser } from '../../../helpers/authenticateUser';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// Apply the authentication middleware to all routes in this router
// router.use(authenticateUser);

router.get(
  '/:id/start',
  // authenticateUser,
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  QuizController.startQuiz
);

router.post(
  '/:id/submit',
  // authenticateUser,
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(QuizValidationSchema.submitAnswerZodSchema),
  QuizController.submitAnswer
);

export const QuizTacking = router;
