import { activities, restRatio } from './constants';

export const nowString = () => new Date().toLocaleDateString();

export const emptyTodayTask = () => ({
  day: nowString(),
  tasks: activities.map((activity) => ({ activity, time: 0 })),
});

export const getTimeRest = (lastFocus: number) => {
  const timeRest = new Date();
  const restSeconds = lastFocus / restRatio;
  timeRest.setSeconds(timeRest.getSeconds() + restSeconds);
  return timeRest;
};

export const formatTime = (time: number) => time < 10 ? '0' + time : time;