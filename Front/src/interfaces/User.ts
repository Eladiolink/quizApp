import { UserType } from "./UserType";

export interface UserResponseDTO {
    id: number;
    name: string;
    type: UserType;
    email: string;
}
  