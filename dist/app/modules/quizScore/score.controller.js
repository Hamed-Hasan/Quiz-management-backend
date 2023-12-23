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
exports.ScoreController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const score_service_1 = require("./score.service");
const score_constant_1 = require("./score.constant");
exports.ScoreController = {
    viewScores: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.userId;
        const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
        const filters = (0, pick_1.default)(req.query, score_constant_1.ScoreFilterableFields);
        const result = yield score_service_1.ScoreService.getUserScores(userId, options, filters);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            meta: result.meta,
            data: result.data,
        });
    })),
    leaderboard: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const category = req.params.category;
        const result = yield score_service_1.ScoreService.getLeaderboard(category);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            data: result,
        });
    })),
};
