"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
exports.ScoreService = {
    getUserScores: (userId, options, filters) => __awaiter(void 0, void 0, void 0, function* () {
        const { page, limit, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(options);
        const skip = (page - 1) * limit;
        const take = limit;
        const whereConditions = Object.assign({ userId }, filters);
        const scores = yield prisma_1.default.score.findMany({
            where: whereConditions,
            skip,
            take,
            orderBy: {
                score: sortOrder,
            },
        });
        const total = yield prisma_1.default.score.count({ where: whereConditions });
        return {
            meta: {
                total,
                page,
                limit,
            },
            data: scores,
        };
    }),
    getLeaderboard: (category) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const leaderboard = yield prisma_1.default.score.groupBy({
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
            const leaderboardData = yield Promise.all(leaderboard.map((entry) => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b;
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        id: entry.userId,
                    },
                    include: {
                        profile: true, // Include the profile relation
                    },
                });
                console.log('User Data:', user);
                // Check if the user has a profile and if the username is available
                const userName = ((_a = user === null || user === void 0 ? void 0 : user.profile) === null || _a === void 0 ? void 0 : _a.username) || 'Unknown';
                return {
                    userId: entry.userId,
                    userName,
                    totalScore: ((_b = entry._sum) === null || _b === void 0 ? void 0 : _b.score) || 0,
                };
            })));
            return leaderboardData;
        }
        catch (error) {
            console.error('Error in getLeaderboard:', error);
            throw error;
        }
    }),
};
