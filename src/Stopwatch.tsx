import { Box, Stack, TextField } from '@mui/material';

import Button from '@mui/material/Button';
import { Task } from './App';
import { Time } from './Time';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

interface StopwatchProps {
  selectedTask?: Task,
  handleExit: (seconds: number) => void,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Stopwatch = (props: StopwatchProps) => {
  const { selectedTask, handleExit } = props;

  const baseDuration = 30;
  const [paused, setPaused] = useState(true);
  const [started, setStarted] = useState(false);
  const [focusTime, setFocusTime] = useState(baseDuration);
  const timeFocus = new Date();
  const focusSeconds = focusTime * 60;
  timeFocus.setSeconds(timeFocus.getSeconds() + focusSeconds);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
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
      setStarted(true);
    }
    setPaused(!paused);
  };

  const handleExitClick = () => {
    handleExit(totalSeconds);
  };

  return (
    <Box display='flex' flexDirection='column'
      alignItems="center" justifyContent="center">
      <Time hours={hours} minutes={minutes} seconds={seconds}
        overtime={totalSeconds >= focusSeconds} />
      <Box sx={{ width: '60%' }}>
        <Stack direction="row" spacing={2}>
          <TextField value={focusTime} size='small'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFocusTime(parseInt(event.target.value))
            }
            disabled={started} label="Duration, min" variant="outlined" />
          <Button variant='outlined'
            onClick={() => handlePauseClick()}>
            {paused ? 'Start' : 'Pause'}
          </Button>
          <Button variant='outlined' onClick={() => handleExitClick()}>
            Rest
          </Button>
        </Stack>
      </Box>
      <Typography textAlign='center' color='textSecondary' variant="subtitle1">
        task: {selectedTask?.activity}
      </Typography>
    </Box>
  );
};

export default Stopwatch;