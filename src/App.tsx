import './App.css';

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
  const activitiesWithTime: Task[] = activities
    .map(activity => ({ activity, time: 0 }));

  const [activity, setActivity] = useState<Activity>('reading');
  const [showTimer, setShowTimer] = useState(true);

  const handleStart = () => {
    setShowTimer(true);
  };

  const handleExit = (seconds: number) => {
    const index = activitiesWithTime.findIndex(a => a.activity === activity);
    activitiesWithTime[index].time = seconds;
    setShowTimer(false);
  };

  const handleActivitySelect = (e: React.FormEvent<HTMLSelectElement>) => {
    setActivity(e.currentTarget.value as Activity);
  };

  const selectedTask = activitiesWithTime.find(a => a.activity === activity);

  return (
    <>
      {showTimer && selectedTask
        ? <Timer
          selectedTask={selectedTask}
          handleExit={handleExit}
        />
        : <>
          <table>
            <tbody>
              {activitiesWithTime.map(a => <tr key={a.activity}>
                <td>{a.activity}</td>
                <td>{a.time}</td>
              </tr>)}
            </tbody>
          </table>
          <button onClick={() => handleStart()}></button>
          <br />
          <select onChange={handleActivitySelect}>
            {activities.map(activity =>
              <option key={activity} value={activity}>{activity}</option>)}
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