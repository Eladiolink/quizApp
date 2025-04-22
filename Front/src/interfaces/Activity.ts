export interface ActivityResponseDTO {
  id: number;
  title: string;
  description: string;
  createdBy: number,
  createdAt: Date
}

export interface ActivityRequestDTO {
  title: string;
  description: string;
  createdById: number;
}
