import { AnsweredQuestionRequestDTO, AnsweredQuestionResponseDTO } from "../interfaces/AnsweredQuestion";
import { AnsweredQuestionSummaryDTO } from "../interfaces/AnsweredQuestionSummaryDTO";
import { get, post } from "./Api";

export async function answeredQuestion(data: AnsweredQuestionRequestDTO): Promise<AnsweredQuestionResponseDTO> {
  return await post<AnsweredQuestionRequestDTO,AnsweredQuestionResponseDTO>('/answered-question', data)
}

export async function answeredQuestionSummaryDTO(activitId: number, userId: number): Promise<AnsweredQuestionSummaryDTO[]> {
  return await get<AnsweredQuestionSummaryDTO[]>(`/answered-question/${activitId}/user/${userId}`)
}
