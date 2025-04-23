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
  }   
  
export type CorrectOption = 'A' | 'B' | 'C' | 'D' | 'E';
  