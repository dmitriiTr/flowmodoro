import { Task } from './App';
import { useState } from 'react';
import { useTimer } from 'react-timer-hook';

interface TimerProps {
  selectedTask: Task,
  handleExit: (seconds: number) => void,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Timer = (props: TimerProps) => {
  const { selectedTask, handleExit } = props;
  const [total, setTotal] = useState(selectedTask.time);

  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<'focus' | 'rest'>('focus');
  const timeFocus = new Date();
  const focusSeconds = 4; //1500
  timeFocus.setSeconds(timeFocus.getSeconds() + focusSeconds);
  const timeRest = new Date();
  const restSeconds = 3; //300
  timeRest.setSeconds(timeRest.getSeconds() + restSeconds); //300

  const onExpire = () => {
    if (mode === 'focus') {
      restart(timeRest, false);
      setMode('rest');
      setTotal(total + 4);
    } else {
      restart(timeFocus, false);
      setMode('focus');
    }
    restart(mode === 'focus' ? timeRest : timeFocus, false);
  };

  const {
    totalSeconds,
    seconds,
    minutes,
    start,
    pause,
    restart,
    resume
  } = useTimer({
    autoStart: false,
    expiryTimestamp: timeFocus,
    onExpire
  });

  const handlePauseClick = () => {
    if (!paused) {
      pause();
    }
    else {
      resume();
    }
    setPaused(!paused);
  };

  const handleStartClick = () => {
    start(); // doesent want to autostart in onExpire()
  };

  const handleExitClick = () => {
    if (mode === 'focus') {
      setTotal(total + focusSeconds - totalSeconds);
    }
    handleExit(total + focusSeconds - totalSeconds);
  };

  return (
    <div className="card">
      <div style={{ fontSize: '100px' }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={handlePauseClick}>Pause/Unpause</button>
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleExitClick}>Exit</button>
      {/* <p className="read-the-docs">
        P to pause, S to stop
      </p> */}
      <p className="read-the-docs">
        {selectedTask.activity} {total}
      </p>
    </div>
  );
};

export default Timer;