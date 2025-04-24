import { ActivityAnswered, ActivityRequestDTO, ActivityResponseDTO } from '../interfaces/Activity';
import { del, get, post } from './Api';

export async function getActivities(): Promise<ActivityResponseDTO[]> {
  const response = await get<ActivityResponseDTO[]>("/activity");
  return response;
}

export async function getFindAllActivitiesNotAnsweredByClient(id: number): Promise<ActivityResponseDTO[]> {
  return await get<ActivityResponseDTO[]>(`/activity/findAllActivitiesNotAnsweredByClient/${id}`);
}

export async function createActivity(data: ActivityRequestDTO): Promise<ActivityResponseDTO> {
  return await post<ActivityRequestDTO,ActivityResponseDTO>('/activity/create', data)
}

export async function deleteActivity(id: number): Promise<void> {
  await del(`/activity/${id}`);
}

export async function getActivityAnswered(id: number): Promise<ActivityAnswered[]> {
  const response = await get<ActivityAnswered[]>(`/activity/allActivities/${id}`);
  return response;
}
