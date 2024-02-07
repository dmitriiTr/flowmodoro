import './App.css';

import Stopwatch from './Stopwatch';
import Timer from './Timer';
import { useState } from 'react';

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
    setTasks(tasks => tasks.map(t => {
      if (t.activity === activity) {
        return { ...t, time: t.time + seconds };
      } else {
        return t;
      }
    }));
    setLastFocus(seconds);
  };

  const handleActivitySelect = (e: React.FormEvent<HTMLSelectElement>) =>
    setActivity(e.currentTarget.value as Activity);

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
          <button onClick={() => handleReturn()}>Exit</button>
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
          <button onClick={() => handleStart()}>Start</button>
          <br />
          <select onChange={handleActivitySelect}>
            {activities.map(a =>
              <option selected={a === activity} key={a} value={a}>{a}</option>)}
          </select>
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