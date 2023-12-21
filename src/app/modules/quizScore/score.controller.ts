import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ScoreService } from './score.service';
import { ScoreFilterableFields } from './score.constant';

export const ScoreController = {
  viewScores: catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filters = pick(req.query, ScoreFilterableFields);

    const result = await ScoreService.getUserScores(userId, options, filters);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      meta: result.meta,
      data: result.data,
    });
  }),

  leaderboard: catchAsync(async (req: Request, res: Response) => {
    const category = req.params.category;
    const result = await ScoreService.getLeaderboard(category);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
    });
  }),
};
