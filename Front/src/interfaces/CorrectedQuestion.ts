export interface CorrectedQuestionDTO {
    id: number;
    clientId: number;
    questionId: number;
    correction: string;
    model: string;
    createdAt: string;
  }