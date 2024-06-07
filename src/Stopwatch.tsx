import { Box, Stack, TextField } from '@mui/material';

import Button from '@mui/material/Button';
import { Time } from './Time';
import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

interface StopwatchProps {
  baseDuration: number;
  handleExit: (seconds: number, newBaseDuration: number) => void,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Stopwatch = (props: StopwatchProps) => {
  const { handleExit, baseDuration } = props;

  const [focusTime, setFocusTime] = useState(baseDuration);
  const focusSeconds = focusTime * 60;

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    start,
    isRunning
  } = useStopwatch({
    autoStart: false,
  });

  const handleStartClick = () => {
    start();
  };

  const handleExitClick = () => {
    handleExit(totalSeconds, focusTime);
  };

  return (
    <Box display='flex' flexDirection='column' pt={6}
      alignItems="center" justifyContent="center">
      <Box height={110}>
        <Time hours={hours} minutes={minutes} seconds={seconds}
          overtime={totalSeconds >= focusSeconds} />
      </Box>
      <Box sx={{ width: '40%' }}>
        <Stack direction="row" spacing={2}>
          <TextField value={isNaN(focusTime) ? '' : focusTime} size='small'
            autoFocus onChange={event =>
              setFocusTime(parseInt(event.target.value))
            }
            disabled={isRunning} label="Duration, min" variant="outlined" />
          {isRunning
            ? <Button variant='outlined' onClick={() => handleExitClick()}>
              Rest
            </Button>
            : <Button variant='outlined' disabled={isRunning}
              onClick={() => handleStartClick()}>
              Start
            </Button>}
        </Stack>
      </Box>
    </Box>
  );
};

export default Stopwatch;