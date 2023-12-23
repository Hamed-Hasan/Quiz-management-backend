"use strict";
// quiz.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizValidationSchema = void 0;
const zod_1 = require("zod");
exports.QuizValidationSchema = {
    submitAnswerZodSchema: zod_1.z.object({
        body: zod_1.z.object({
            questionId: zod_1.z.string(),
            selectedOptionId: zod_1.z.string(),
        }),
    }),
};
