import { REST_RATIO, activities } from './constants';

export const nowString = () => new Date().toLocaleDateString();

export const emptyTodayTask = () => ({
  day: nowString(),
  tasks: activities.map((activity) => ({ activity, time: 0 })),
});

export const getTimeRest = (lastFocus: number) => {
  const timeRest = new Date();
  const restSeconds = lastFocus / REST_RATIO;
  timeRest.setSeconds(timeRest.getSeconds() + restSeconds);
  return timeRest;
};

export const formatTime = (time: number) => time < 10 ? '0' + time : time;

export const formatTimeWithSeconds = (minutes: number, seconds: number) =>
  `${formatTime(minutes)}:${formatTime(seconds)}`;

export const secondsToRoundedMinutes = (seconds: number) =>
  Math.floor(seconds / 60);