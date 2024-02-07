import { Task } from './App';
import { useTimer } from 'react-timer-hook';

//import { useState } from 'react';


interface TimerProps {
  selectedTask: Task,
  handleExit: () => void,
  lastFocus: number
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Timer = (props: TimerProps) => {
  const { handleExit, lastFocus } = props;

  //const [paused, setPaused] = useState(false);
  const timeRest = new Date();
  const restSeconds = lastFocus / 2; // lastFocus / 5
  timeRest.setSeconds(timeRest.getSeconds() + restSeconds);

  const onExpire = () => {
    console.warn('expired');
  };

  const {
    //totalSeconds,
    seconds,
    minutes,
    //start,
    //pause,
    //restart,
    //resume
  } = useTimer({
    autoStart: true,
    expiryTimestamp: timeRest,
    onExpire
  });

  // const handlePauseClick = () => {
  //   if (!paused) {
  //     pause();
  //   }
  //   else {
  //     resume();
  //   }
  //   setPaused(!paused);
  // };

  // const handleStartClick = () => {
  //   start(); // doesent want to autostart in onExpire()
  // };

  const handleExitClick = () => {
    handleExit();
  };

  return (
    <div className="card">
      <div style={{ fontSize: '100px' }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {/* <button onClick={handlePauseClick}>Pause/Unpause</button> */}
      {/* <button onClick={handleStartClick}>Start</button> */}
      <button onClick={handleExitClick}>End rest</button>
      {/* <p className="read-the-docs">
        P to pause, S to stop
      </p> */}
      <p className="read-the-docs">
        rest
      </p>
    </div>
  );
};

export default Timer;