import Button from '@mui/material/Button';
import { Task } from './App';
import Typography from '@mui/material/Typography';
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
      <Button variant='outlined' onClick={() => handleExitClick()}>
        End rest
      </Button>
      <Typography color="textSecondary" variant="subtitle1">
        rest
      </Typography>
    </div>
  );
};

export default Timer;