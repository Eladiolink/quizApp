import { ActivityRequestDTO, ActivityResponseDTO } from '../interfaces/Activity';
import api from './Api';


export async function getActivities(): Promise<ActivityResponseDTO[]> {
    const response = await api.get<ActivityResponseDTO[]>('/activity');
    return response.data;
}

export async function createActivity(data: ActivityRequestDTO): Promise<void> {
  await api.post('/activity/create', data);
}
