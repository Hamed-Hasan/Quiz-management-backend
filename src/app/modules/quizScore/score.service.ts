import { Prisma } from '@prisma/client';
import {
  IOptions,
  calculatePagination,
} from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';

type SortOrder = 'asc' | 'desc';

export const ScoreService = {
  getUserScores: async (userId: string, options: IOptions, filters: any) => {
    const { page, limit, sortBy, sortOrder } = calculatePagination(options);

    const skip = (page - 1) * limit;
    const take = limit;

    const whereConditions: Prisma.ScoreWhereInput = {
      userId,
      ...filters,
    };

    const scores = await prisma.score.findMany({
      where: whereConditions,
      skip,
      take,
      orderBy: {
        score: sortOrder as SortOrder,
      },
    });

    const total = await prisma.score.count({ where: whereConditions });

    return {
      meta: {
        total,
        page,
        limit,
      },
      data: scores,
    };
  },

  getLeaderboard: async (category: string) => {
    try {
      const leaderboard = await prisma.score.groupBy({
        by: ['userId'],
        where: {
          quiz: {
            category,
          },
        },
        _sum: {
          score: true,
        },
        orderBy: {
          _sum: {
            score: 'desc',
          },
        },
        take: 10,
      });

      const leaderboardData = await Promise.all(
        leaderboard.map(async entry => {
          const user = await prisma.user.findUnique({
            where: {
              id: entry.userId,
            },
            include: {
              profile: true, // Include the profile relation
            },
          });

          console.log('User Data:', user);

          // Check if the user has a profile and if the username is available
          const userName = user?.profile?.username || 'Unknown';

          return {
            userId: entry.userId,
            userName,
            totalScore: entry._sum?.score || 0,
          };
        })
      );

      return leaderboardData;
    } catch (error) {
      console.error('Error in getLeaderboard:', error);
      throw error;
    }
  },
};
