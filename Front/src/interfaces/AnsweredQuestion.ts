export interface AnsweredQuestionRequestDTO {
    clientId: number;
    questionId: number;
    selectedOption: string;
}

export interface AnsweredQuestionResponseDTO {
    questionId: number;
    selectedOption: string;
    isCorrect: boolean;
}
  
  