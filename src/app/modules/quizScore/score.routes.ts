import express from 'express';
import { ScoreController } from './score.controller';


const router = express.Router();

router.get(
  '/:userId',
  ScoreController.viewScores
);

router.get(
  '/leaderboard/:category',
  ScoreController.leaderboard
);

export const ScoreRoutes = router;
