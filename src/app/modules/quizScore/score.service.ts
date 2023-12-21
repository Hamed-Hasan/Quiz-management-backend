import { Prisma } from '@prisma/client';
import { IOptions, calculatePagination } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';



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
        [sortBy]: sortOrder,
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
      take: 10, // Adjust as needed
    });

    const leaderboardData = await Promise.all(
        leaderboard.map(async (entry) => {
          const user = await prisma.user.findUnique({
            where: {
              id: entry.userId,
            },
            include: {
              profile: true, // Include the profile relation
            },
          });
      
          return {
            userId: entry.userId,
            userName: user?.profile?.username || '',
            totalScore: entry._sum?.score || 0,
          };
        })
      );
      

    return leaderboardData;
  },
};
