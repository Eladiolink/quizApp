import { ActivityQuestionRequestDTO, ActivityQuestionResponseDTO, ClientActivityQuestionResponseDTO } from "../interfaces/ActivityQuestion";
import { get, post } from "./Api";

export async function getQuestionsByActivity(id: number): Promise<ClientActivityQuestionResponseDTO[]> {
  return await get<ClientActivityQuestionResponseDTO[]>(`/activity-question/findAllByActivity/${id}`);
}

export async function createQuestion(data: ActivityQuestionRequestDTO): Promise<ActivityQuestionResponseDTO> {
  return await post<ActivityQuestionRequestDTO, ActivityQuestionResponseDTO>('/activity-question', data)
}