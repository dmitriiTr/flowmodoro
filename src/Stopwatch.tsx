import { Box, Stack, TextField } from '@mui/material';

import Button from '@mui/material/Button';
import { Time } from './Time';
import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

interface StopwatchProps {
  handleExit: (seconds: number) => void,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Stopwatch = (props: StopwatchProps) => {
  const { handleExit } = props;

  const baseDuration = 30;
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
  } = useStopwatch({
    autoStart: false,
  });

  const handleStartClick = () => {
    start();
    setStarted(true);
  };

  const handleExitClick = () => {
    handleExit(totalSeconds);
  };

  return (
    <Box display='flex' flexDirection='column' pt={6}
      alignItems="center" justifyContent="center">
      <Time hours={hours} minutes={minutes} seconds={seconds}
        overtime={totalSeconds >= focusSeconds} />
      <Box sx={{ width: '40%' }}>
        <Stack direction="row" spacing={2}>
          <TextField value={focusTime} size='small'
            autoFocus onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFocusTime(parseInt(event.target.value))
            }
            disabled={started} label="Duration, min" variant="outlined" />
          {started
            ? <Button variant='outlined' onClick={() => handleExitClick()}>
              Rest
            </Button>
            : <Button variant='outlined' disabled={started}
              onClick={() => handleStartClick()}>
              Start
            </Button>}
        </Stack>
      </Box>
    </Box>
  );
};

export default Stopwatch;