import './App.css';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Stopwatch from './Stopwatch';
import Timer from './Timer';

const activities = ['reading', 'work'] as const;
type Activity = typeof activities[number];
export interface Task {
  activity: Activity;
  time: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = () => {
  const [tasks, setTasks] = useState(activities
    .map(activity => ({ activity, time: 0 })) as Task[]);

  const [activity, setActivity] = useState<Activity>('work');
  const [showTimer, setShowTimer] = useState(true);
  const [lastFocus, setLastFocus] = useState<null | number>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('task');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleStart = () => {
    setShowTimer(true);
  };

  const handleReturn = () => {
    setShowTimer(false);
    setLastFocus(null);
  };

  const handleExitTimer = () => {
    setLastFocus(null);
  };

  const handleExitStopwatch = (seconds: number) => {
    const updatedTasks = tasks.map(t =>
      t.activity === activity ? { ...t, time: t.time + seconds } : t);
    setLastFocus(seconds);
    setTasks(updatedTasks);
    localStorage.setItem('task', JSON.stringify(updatedTasks));
  };

  const handleActivitySelect = (e: SelectChangeEvent) =>
    setActivity(e.target.value as Activity);

  const selectedTask = tasks.find(a => a.activity === activity);

  return (
    <>
      {showTimer && selectedTask
        ? <>
          {lastFocus
            ? <Timer
              lastFocus={lastFocus}
              selectedTask={selectedTask}
              handleExit={handleExitTimer}
            />
            : <Stopwatch
              selectedTask={selectedTask}
              handleExit={handleExitStopwatch}
            />}
          <Button variant='contained' onClick={() => handleReturn()}>
            Exit
          </Button>
        </>
        : <>
          <table>
            <tbody>
              {tasks.map(a => <tr key={a.activity}>
                <td>{a.activity}</td>
                <td>{a.time}</td>
              </tr>)}
            </tbody>
          </table>
          <Button variant='contained' onClick={() => handleStart()}>
            Start
          </Button>
          <br />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="activity-label">Activity</InputLabel>
            <Select
              labelId="activity-label"
              value={activity}
              onChange={handleActivitySelect}
              label="Activity"
            >
              {activities.map(a =>
                <MenuItem key={a} value={a}>{a}</MenuItem>)}
            </Select>
          </FormControl>
        </>}
    </>
  );
};

export default App;

// useEffect(() => {
//   const keyDownHandler = (e: globalThis.KeyboardEvent) => {
//     if (e.key === 'p') {
//       e.preventDefault();
//       console.log(paused);
//       if (!paused) {
//         setPaused((state) => {
//           console.log(state);
//           return true;
//         });
//         pause();
//         setPaused((state) => {
//           console.log(state);
//           return true;
//         });
//       }
//       else {
//         setPaused(false);
//         console.log('resume');
//         resume();
//       }
//     }
//   }
//   document.addEventListener('keydown', keyDownHandler);
//   return () => {
//     document.removeEventListener('keydown', keyDownHandler);
//   };

// }, [pause, paused, resume]);