"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizValidationSchema = void 0;
const zod_1 = require("zod");
exports.QuizValidationSchema = {
    createQuizZodSchema: zod_1.z.object({
        body: zod_1.z.object({
            title: zod_1.z.string(),
            category: zod_1.z.string(),
        }),
    }),
    editQuizZodSchema: zod_1.z.object({
        body: zod_1.z.object({
            title: zod_1.z.string().optional(),
            category: zod_1.z.string().optional(),
        }),
    }),
};
