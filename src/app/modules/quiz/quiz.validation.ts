
import { z } from 'zod';

export const QuizValidationSchema = {
  createQuizZodSchema: z.object({
    body: z.object({
      title: z.string(),
      category: z.string(),
    })
  }),

  editQuizZodSchema: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
  }),
};
