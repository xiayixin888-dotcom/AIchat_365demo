export type Role = 'user' | 'ai';

export type TaskStatus = 'wait' | 'loading' | 'done';

export interface TaskItem {
  id: string;
  text: string;
  status: TaskStatus;
}

export type CardData = 
  | { type: 'audience'; count: number; samples: string[]; confirmed?: boolean }
  | { type: 'config'; senders: string[]; blacklists: string[]; confirmed?: boolean };

export interface Message {
  id: string;
  role: Role;
  content?: string;
  taskPlan?: TaskItem[];
  card?: CardData;
  progress?: number;
  actionButton?: { label: string; tabName: string };
}

export interface Bubble {
  id: string;
  type: 'audience' | 'task';
  text: string;
  items: { id: string; name: string; tabName: string }[];
}

export interface Tab {
  id: string;
  title: string;
  content: string;
}

