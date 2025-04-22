
import { AuthLogin, LoginResponse } from "../interfaces/Auth";
import api from "./Api";

export async function authLogin(data: AuthLogin): Promise<LoginResponse> {

  const response = await api.post<LoginResponse>('/auth/login', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  
  var token: string = response.data.token;
  var role: string = response.data.role;
  var id: number = response.data.id;
  var name: string = response.data.name;

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("id", id.toString());
  localStorage.setItem("name", name);
  return response.data;
}