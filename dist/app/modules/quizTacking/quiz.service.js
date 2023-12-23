"use strict";
// quiz.service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.QuizService = {
    startQuizForUser: (quizId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('UserID in startQuizForUser:', userId);
        // Fetch quiz details and generate random questions for the user
        const quizDetails = yield prisma.quiz.findUnique({
            where: { id: quizId },
            include: { questions: { include: { options: true } } },
        });
        if (!quizDetails) {
            throw new Error('Quiz not found');
        }
        const randomQuestions = quizDetails.questions
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);
        return {
            quizId: quizDetails.id,
            title: quizDetails.title,
            category: quizDetails.category,
            questions: randomQuestions.map(question => ({
                id: question.id,
                content: question.content,
                options: question.options.map(option => ({
                    id: option.id,
                    content: option.content,
                })),
            })),
        };
    }),
    submitAnswer: (quizId, userId, questionId, selectedOptionId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userId) {
            throw new Error('User ID is required to submit the answer');
        }
        const question = yield prisma.question.findUnique({
            where: { id: questionId },
            include: { options: true },
        });
        if (!question) {
            throw new Error('Question not found');
        }
        const selectedOption = question.options.find(option => option.id === selectedOptionId);
        if (!selectedOption) {
            throw new Error('Selected option not found');
        }
        const isCorrect = selectedOption.isCorrect || false;
        const user = yield prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        if (isCorrect) {
            yield prisma.score.create({
                data: { score: 10, userId, quizId },
            });
        }
        return { message: 'Answer submitted successfully', isCorrect };
    }),
};
