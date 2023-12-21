
export interface IQuiz {
    id: string;
    title: string;
    category: string;
    creator: { connect: { id: string } };

  }
  