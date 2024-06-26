import AlarmSound from './alarm.mp3';

export const baseMinDuration = 30;
export const restRatio = 5;
export const activities = ['reading', 'work'] as const;

export const alarm = new Audio(AlarmSound);