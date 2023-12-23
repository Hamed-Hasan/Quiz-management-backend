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
exports.QuizController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const quiz_service_1 = require("./quiz.service");
exports.QuizController = {
    startQuiz: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // console.log('User Object:', req.user);
        const quizId = req.params.id;
        const quizData = yield quiz_service_1.QuizService.startQuizForUser(quizId, (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
        (0, sendResponse_1.default)(res, { statusCode: 200, success: true, data: quizData });
    })),
    submitAnswer: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        console.log('User Object:', (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId);
        const quizId = req.params.id;
        const userId = ((_c = req.user) === null || _c === void 0 ? void 0 : _c.userId) || '';
        // console.log('UserIDs:', userId, 'QuizID:', quizId);
        const { questionId, selectedOptionId } = req.body;
        const result = yield quiz_service_1.QuizService.submitAnswer(quizId, userId, questionId, selectedOptionId);
        (0, sendResponse_1.default)(res, { statusCode: 200, success: true, data: result });
    })),
};
