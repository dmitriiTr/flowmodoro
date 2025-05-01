import { activities } from './constants';

export type Activity = typeof activities[number];
export interface Task {
  activity: Activity;
  time: number;
  day: string;
  id: number;
}