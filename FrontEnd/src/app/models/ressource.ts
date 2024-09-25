export interface Resource {
  id?: number;
  name: string;
  quantity: number;
  type: 'MATERIAL' | 'SERVICE' | 'TOOL';
  provider: string;
  taskId: number;
}
