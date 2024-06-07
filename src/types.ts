import { activities } from './constants';

export type Activity = typeof activities[number];
export interface Task {
  activity: Activity;
  time: number;
}

export interface TasksWithDay {
  day: string,
  tasks: Task[]
}