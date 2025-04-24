import { AnsweredQuestionRequestDTO, AnsweredQuestionResponseDTO } from "../interfaces/AnsweredQuestion";
import { post } from "./Api";

export async function answeredQuestion(data: AnsweredQuestionRequestDTO): Promise<AnsweredQuestionResponseDTO> {
  return await post<AnsweredQuestionRequestDTO,AnsweredQuestionResponseDTO>('/answered-question', data)
}
