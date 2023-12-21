import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ProfileRoutes } from '../modules/profiles/profile.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { QuizManage } from '../modules/quizManagement/quiz.routes';
import { QuizTacking } from '../modules/quizTacking/quiz.routes';
import { ScoreRoutes } from '../modules/quizScore/score.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/profiles',
    routes: ProfileRoutes,
  },
  {
    path: '/quizzes', 
    routes: QuizManage,
  },
  {
    path: '/quizzesTack', 
    routes: QuizTacking,
  },
  {
    path: '/scores', 
    routes: ScoreRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));

export default router;
