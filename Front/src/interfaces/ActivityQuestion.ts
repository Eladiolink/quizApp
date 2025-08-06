export interface ActivityQuestionRequestDTO {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    optionE: string;
    correctOption: string; 
    image?: string;
    activityId: number;
    knowledgeArea: string|null;
    questionNumber: number;
  }

export interface ActivityQuestionResponseDTO {
    id: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    optionE: string;
    correctOption: CorrectOption;
    image?: string;
    activityId: number;
    createdAt: string;
    knowledgeArea: string;
    questionNumber: number;
  }

  export interface ClientActivityQuestionResponseDTO {
    id: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    optionE: string;
    activityId: number;
    questionNumber: number;
  }   
  
export type CorrectOption = 'A' | 'B' | 'C' | 'D' | 'E';
  