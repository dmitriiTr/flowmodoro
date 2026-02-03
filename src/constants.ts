import AlarmSound from './alarm.mp3';

export const BASE_FOCUS_DURATION_MINUTES = 30;
export const REST_RATIO = 5;
export const activities = ['reading', 'work'] as const;
export const LOCAL_STORAGE_KEY = 'tasks';

export const alarm = new Audio(AlarmSound);