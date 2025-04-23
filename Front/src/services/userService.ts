import { UserResponseDTO } from '../interfaces/User';
import { get } from './Api';


export async function getUsers(): Promise<UserResponseDTO[]> {
    const response = await get<UserResponseDTO[]>('/user');
    return response;
  }