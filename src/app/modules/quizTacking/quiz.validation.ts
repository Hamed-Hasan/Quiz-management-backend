// quiz.validation.ts

import { z } from 'zod';

export const QuizValidationSchema = {
  submitAnswerZodSchema: z.object({
    body: z.object({
      questionId: z.string(),
      selectedOptionId: z.string(),
    }),
  }),
};
