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
    createQuiz: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const quizData = req.body;
        const createdQuiz = yield quiz_service_1.QuizService.createQuiz(quizData);
        (0, sendResponse_1.default)(res, {
            message: 'Quiz Created successfully.',
            statusCode: 201,
            success: true,
            data: createdQuiz,
        });
    })),
    editQuiz: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const quizId = req.params.id;
        const quizData = req.body;
        const editedQuiz = yield quiz_service_1.QuizService.editQuiz(quizId, quizData);
        (0, sendResponse_1.default)(res, {
            message: 'Quiz Edited successfully.',
            statusCode: 200,
            success: true,
            data: editedQuiz,
        });
    })),
    deleteQuiz: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const quizId = req.params.id;
        yield quiz_service_1.QuizService.deleteQuiz(quizId);
        (0, sendResponse_1.default)(res, {
            message: 'Quiz deleted successfully.',
            statusCode: 200,
            success: true,
        });
    })),
};
