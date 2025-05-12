import { CorrectedQuestionDTO } from "../interfaces/CorrectedQuestion";
import { get } from "./Api";

export async function getCorrectedQuestion(activityId: number, userId: number): Promise<CorrectedQuestionDTO[]> {
  return await get<CorrectedQuestionDTO[]>(`/corrected-question/activity/${activityId}/user/${userId}`);
}
