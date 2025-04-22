import { ActivityRequestDTO, ActivityResponseDTO } from '../interfaces/Activity';
import api from './Api';


export async function getActivities(): Promise<ActivityResponseDTO[]> {
  const token = localStorage.getItem("token");

  const response = await api.get<ActivityResponseDTO[]>('/activity', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export async function createActivity(data: ActivityRequestDTO): Promise<void> {
  const token = localStorage.getItem("token");

  await api.post('/activity/create', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
