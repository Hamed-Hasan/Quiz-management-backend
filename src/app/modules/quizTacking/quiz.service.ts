// quiz.service.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const QuizService = {
  startQuizForUser: async (quizId: string, userId: string) => {
    console.log('UserID in startQuizForUser:', userId);

    // Fetch quiz details and generate random questions for the user
    const quizDetails = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: { include: { options: true } } },
    });

    if (!quizDetails) {
      throw new Error('Quiz not found');
    }

    const randomQuestions = quizDetails.questions.sort(() => 0.5 - Math.random()).slice(0, 5);

    return {
      quizId: quizDetails.id,
      title: quizDetails.title,
      category: quizDetails.category,
      questions: randomQuestions.map((question) => ({
        id: question.id,
        content: question.content,
        options: question.options.map((option) => ({
          id: option.id,
          content: option.content,
        })),
      })),
    };
  },

  submitAnswer: async (quizId: string, userId: string, questionId: string, selectedOptionId: string) => {
    if (!userId) {
      throw new Error('User ID is required to submit the answer');
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { options: true },
    });

    if (!question) {
      throw new Error('Question not found');
    }

    const selectedOption = question.options.find((option) => option.id === selectedOptionId);

    if (!selectedOption) {
      throw new Error('Selected option not found');
    }

    const isCorrect = selectedOption.isCorrect || false;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    if (isCorrect) {
      await prisma.score.create({
        data: { score: 10, userId, quizId },
      });
    }

    return { message: 'Answer submitted successfully', isCorrect };
  },
};

