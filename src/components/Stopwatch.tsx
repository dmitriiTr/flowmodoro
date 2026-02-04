import { Box, Stack, TextField, useTheme } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';

import Button from '@mui/material/Button';
import { TasksContext } from '../TasksContextProvider';
import { Time } from './Time';
import { alarm } from '../constants';
import { useStopwatch } from 'react-timer-hook';

interface StopwatchProps {
  handleRest: (seconds: number, newBaseDuration: number) => void;
}

const Stopwatch = ({ handleRest }: StopwatchProps) => {
  const theme = useTheme();
  const { baseFocusTime } = useContext(TasksContext)!;

  const [focusTime, setFocusTime] = useState(baseFocusTime);
  const focusSeconds = useMemo(() => focusTime * 60, [focusTime]);

  const { totalSeconds, seconds, minutes, hours, start, isRunning } =
    useStopwatch({
      autoStart: false,
    });

  const isTimeCompleted = totalSeconds >= focusSeconds;

  useEffect(() => {
    let interval: number | null = null;
    if (isTimeCompleted) {
      interval = setInterval(() => alarm.play(), 30 * 60 * 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimeCompleted]);

  const handleStartClick = () => {
    start();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      start();
    }
  };

  const handleRestClick = () => {
    handleRest(totalSeconds, focusTime);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFocusTime(parseInt(event.target.value));
  };

  const getColorForTime = () => {
    const isOvertime = totalSeconds >= focusSeconds * 2;

    if (isOvertime) {
      return theme.palette.warning.dark;
    }

    if (isTimeCompleted) {
      return theme.palette.primary.main;
    }

    return undefined;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box height={110}>
        <Time
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          color={getColorForTime()}
        />
      </Box>
      <Box sx={{ width: '40%' }}>
        <Stack direction="row" spacing={2}>
          <TextField
            value={isNaN(focusTime) ? '' : focusTime}
            size="small"
            onKeyDown={e => handleKeyDown(e)}
            autoFocus
            onChange={e => handleChange(e)}
            disabled={isRunning}
            label="Duration, min"
            variant="outlined"
          />
          {isRunning ? (
            <Button variant="outlined" onClick={() => handleRestClick()}>
              Rest
            </Button>
          ) : (
            <Button
              variant="outlined"
              disabled={isRunning}
              onClick={() => handleStartClick()}
            >
              Start
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Stopwatch;
