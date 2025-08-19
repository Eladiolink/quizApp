export interface AnsweredQuestionSummaryDTO {
    questionId: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    optionE: string;
    correctOption: Option;
    image: string;
    selectedOption: Option;
    knowledgeArea: String;
  }
  
  export type Option = "A" | "B" | "C" | "D" | "E";
  