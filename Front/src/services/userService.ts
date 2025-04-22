import { UserResponseDTO } from '../interfaces/User';
import api from './Api';


export async function getUsers(): Promise<UserResponseDTO[]> {
    const response = await api.get<UserResponseDTO[]>('/user');
    return response.data;
  }