import { Task } from './App';
import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

interface StopwatchProps {
  selectedTask: Task,
  handleExit: (seconds: number) => void,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Stopwatch = (props: StopwatchProps) => {
  const { selectedTask, handleExit } = props;

  const [paused, setPaused] = useState(true);
  const timeFocus = new Date();
  const focusSeconds = 3; //1500
  timeFocus.setSeconds(timeFocus.getSeconds() + focusSeconds);

  const {
    totalSeconds,
    seconds,
    minutes,
    start,
    pause
  } = useStopwatch({
    autoStart: false,
  });

  const handlePauseClick = () => {
    if (!paused) {
      pause();
    }
    else {
      start();
    }
    setPaused(!paused);
  };

  const handleExitClick = () => {
    handleExit(totalSeconds);
  };

  return (
    <div className="card">
      <div style={{
        fontSize: '100px',
        color: totalSeconds > focusSeconds ? 'green' : 'black'
      }}>
        <span>{minutes}</span>:<span>{seconds}
        </span>
      </div>
      <button onClick={handlePauseClick}>Start/Pause</button>
      <button onClick={handleExitClick}>Rest</button>
      {/* <p className="read-the-docs">
        P to pause, S to stop
      </p> */}
      <p className="read-the-docs">
        task: {selectedTask.activity}
      </p>
    </div>
  );
};

export default Stopwatch;