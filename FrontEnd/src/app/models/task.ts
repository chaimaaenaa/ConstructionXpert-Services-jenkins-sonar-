export interface Task {
  id?: number;
  description: string;
  startDate: string;
  endDate: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  projectId: number
}
