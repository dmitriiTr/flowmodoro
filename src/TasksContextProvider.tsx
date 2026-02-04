import { Activity, Task } from './types';
import { BASE_FOCUS_DURATION_MINUTES, LOCAL_STORAGE_KEY } from './constants';
import React, { createContext, useState } from 'react';

import { nowString } from './utils';

export interface TasksContextType {
  tasks: Task[];
  activity: Activity;
  handleActivitySelect: (activity: Activity) => void;
  baseFocusTime: number;
  totalTimeForCurrentActivityToday: number;
  handleRest: (time: number, newBaseDuration: number) => void;
}

export const TasksContext = createContext<TasksContextType | null>(null);

interface ChildrenProps {
  children: React.ReactNode;
}

export const TasksContextProvider = ({ children }: ChildrenProps) => {
  const getTasksFromStorage = () => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTasks ? (JSON.parse(storedTasks) as Task[]) : [];
  };

  const [tasks, setTasks] = useState<Task[]>(getTasksFromStorage);
  const [activity, setActivity] = useState<Activity>('work');
  const [baseFocusTime, setBaseFocusTime] = useState(
    BASE_FOCUS_DURATION_MINUTES
  );

  const handleRest = (time: number, newBaseDuration: number) => {
    setBaseFocusTime(newBaseDuration);
    setTasks(tasks => {
      const newTaskId = tasks.length + 1;
      const updatedTasks = tasks.concat([
        {
          activity,
          time,
          day: nowString(),
          id: newTaskId,
        },
      ]);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleActivitySelect = (activity: Activity) => setActivity(activity);

  const totalTimeForCurrentActivityToday = tasks
    .filter(t => t.day === nowString() && t.activity === activity)
    .reduce((a, b) => a + b.time, 0);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        baseFocusTime,
        handleRest,
        handleActivitySelect,
        totalTimeForCurrentActivityToday,
        activity,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
