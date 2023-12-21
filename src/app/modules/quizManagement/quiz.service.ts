import { Quiz } from "@prisma/client";
import prisma from "../../../shared/prisma";

export interface QuizService {
  createQuiz(quizData: Quiz): Promise<Quiz>;
  editQuiz(quizId: string, quizData: Quiz): Promise<Quiz>;
  deleteQuiz(quizId: string): Promise<void>;
}

export const QuizService: QuizService = {
  async createQuiz(quizData: Quiz): Promise<Quiz> {
    const createdQuiz = await prisma.quiz.create({
      data: quizData,
    });
    return createdQuiz;
  },

  async editQuiz(quizId: string, quizData: Quiz): Promise<Quiz> {
    const editedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: quizData,
    });
    return editedQuiz;
  },

  async deleteQuiz(quizId: string): Promise<void> {
    await prisma.quiz.delete({
      where: { id: quizId },
    });
  },
};

