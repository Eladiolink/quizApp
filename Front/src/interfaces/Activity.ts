export interface ActivityResponseDTO {
  id: number;
  title: string;
  description: string;
  createdBy: number;
  createdAt: Date;
  activityYear: number;
}

export interface ActivityRequestDTO {
  title: string;
  description: string;
  createdById: number;
  activityYear: number;
}

export interface ActivityAnswered {
  id: number;
  title: string;
  description: string;
  status: string | null;
}