import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Stopwatch from './Stopwatch';
import { TasksContext } from './TasksContextProvider';
import Timer from './Timer';
import { secondsToRoundedMinutes } from './utils';

interface ClockProps {
  goToResults: VoidFunction;
}

const Clock = ({ goToResults }: ClockProps) => {
  const {
    activity,
    totalTimeForCurrentActivityToday,
    handleRest,
  } = useContext(TasksContext)!;

  const [lastFocusTime, setLastFocus] = useState<null | number>(null);

  const onRest = (seconds: number, newBaseDuration: number) => {
    setLastFocus(seconds);
    handleRest(seconds, newBaseDuration);
  };

  const isShowTimer = Boolean(lastFocusTime);

  const onBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  return (
    <>
      {isShowTimer ? (
        <>
          <Box height={65}>
            <Typography textAlign="center" color="textSecondary" variant="h4">
              Task: Rest
            </Typography>
            <Typography
              textAlign="center"
              color="textSecondary"
              variant="subtitle2"
            >
              focused for{' '}
              {secondsToRoundedMinutes(totalTimeForCurrentActivityToday)} min
            </Typography>
          </Box>
          <Timer
            lastFocus={lastFocusTime ?? 0}
            handleExit={() => setLastFocus(null)}
          />
        </>
      ) : (
        <>
          <Box height={65}>
            <Typography textAlign="center" color="textSecondary" variant="h4">
              Task: {activity}
            </Typography>
          </Box>
          <Stopwatch handleRest={onRest} />
        </>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => goToResults()}>
          Exit
        </Button>
      </Box>
    </>
  );
};

export default Clock;
