// quiz.interface.ts
export interface QuizCreateInput {
    title: string;
    category: string;
    // Add other properties as needed
  }
  
  export interface QuizEditInput {
    title?: string;
    category?: string;
    // Add other properties as needed
  }
  