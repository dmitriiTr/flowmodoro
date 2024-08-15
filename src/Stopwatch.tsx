import { Box, Stack, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import Button from '@mui/material/Button';
import { Time } from './Time';
import { alarm } from './constants';
import { useStopwatch } from 'react-timer-hook';

interface StopwatchProps {
  baseDuration: number;
  handleExit: (seconds: number, newBaseDuration: number) => void,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Stopwatch = (props: StopwatchProps) => {
  const { handleExit, baseDuration } = props;

  const [focusTime, setFocusTime] = useState(baseDuration);
  const focusSeconds = useMemo(() => focusTime * 60, [focusTime]);

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
  const isOvertime = totalSeconds >= focusSeconds;

  useEffect(() => {
    let interval: number | null = null;
    if (isOvertime) {
      interval = setInterval(() => alarm.play(), 30 * 60 * 1000);
    }
    return () => {
      if(interval) {
        clearInterval(interval);
      }
    };
  }, [isOvertime]);

  const handleStartClick = () => {
    start();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if(event.key === 'Enter') {
      start();
    }
  };

  const handleExitClick = () => {
    handleExit(totalSeconds, focusTime);
  };

  return (
    <Box display='flex' flexDirection='column'
      alignItems="center" justifyContent="center">
      <Box height={110}>
        <Time hours={hours} minutes={minutes} seconds={seconds}
          overtime={isOvertime} />
      </Box>
      <Box sx={{ width: '40%' }}>
        <Stack direction="row" spacing={2}>
          <TextField value={isNaN(focusTime) ? '' : focusTime} size='small'
            onKeyDown={handleKeyDown}
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