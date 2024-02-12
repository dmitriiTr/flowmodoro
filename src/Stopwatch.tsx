import { Box, Stack } from '@mui/material';

import Button from '@mui/material/Button';
import { Task } from './App';
import Typography from '@mui/material/Typography';
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
    <Box display='flex' flexDirection='column'
      alignItems="center" justifyContent="center">
      <Typography textAlign='center' variant='h1'
        color={totalSeconds > focusSeconds ? 'primary' : undefined}>
        {minutes}:{seconds}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant='outlined' onClick={() => handlePauseClick()}>
          Start/Pause
        </Button>
        <Button variant='outlined' onClick={() => handleExitClick()}>
          Rest
        </Button>
      </Stack>
      <Typography textAlign='center' color='textSecondary' variant="subtitle1">
        task: {selectedTask.activity}
      </Typography>
    </Box>
  );
};

export default Stopwatch;