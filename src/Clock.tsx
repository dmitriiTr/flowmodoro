import { Box, Typography } from '@mui/material';

import { Activity } from './types';
import Button from '@mui/material/Button';
import Stopwatch from './Stopwatch';
import Timer from './Timer';
import { secondsToRoundedMinutes } from './utils';
import { useState } from 'react';

interface ClockProps {
  activity: Activity;
  goToResults: VoidFunction;
  baseFocusTime: number;
  totalTimeForCurrentActivityToday: number;
  handleRest: (time: number, newBaseDuration: number) => void;
}

const Clock = ({
  activity,
  baseFocusTime,
  totalTimeForCurrentActivityToday,
  handleRest,
  goToResults,
}: ClockProps) => {
  const [lastFocusTime, setLastFocus] = useState<null | number>(null);

  const onRest = (seconds: number, newBaseDuration: number) => {
    setLastFocus(seconds);
    handleRest(seconds, newBaseDuration);
  };

  const isShowTimer = Boolean(lastFocusTime);

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
          <Stopwatch handleRest={onRest} baseDuration={baseFocusTime} />
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
