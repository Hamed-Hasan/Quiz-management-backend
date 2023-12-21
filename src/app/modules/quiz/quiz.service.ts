
import prisma from '../../../shared/prisma';
import { IQuiz } from './quiz.interface';

const createQuiz = async (quizData: IQuiz): Promise<IQuiz> => {
  const createdQuiz = await prisma.quiz.create({
    data: quizData,
  });

  return createdQuiz;
};

const editQuiz = async (quizId: string, quizData: Partial<IQuiz>): Promise<IQuiz> => {
  const updatedQuiz = await prisma.quiz.update({
    where: { id: quizId },
    data: quizData,
  });

  return updatedQuiz;
};

const deleteQuiz = async (quizId: string): Promise<IQuiz> => {
  const deletedQuiz = await prisma.quiz.delete({
    where: { id: quizId },
  });

  return deletedQuiz;
};

export const QuizService = {
  createQuiz,
  editQuiz,
  deleteQuiz,
};
