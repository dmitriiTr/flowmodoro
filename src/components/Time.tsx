import Typography from '@mui/material/Typography';
import { formatTimeWithSeconds } from '../utils';
import { useState } from 'react';

interface TimeProps {
  hours: number;
  minutes: number;
  seconds: number;
  color?: string;
}

export const Time = (props: TimeProps) => {
  const [showSeconds, setShowSeconds] = useState(false);
  const { hours, minutes, seconds, color } = props;

  const minutesSum = minutes + hours * 60;

  return (
    <Typography
      display={'inline'}
      textAlign="center"
      variant="h1"
      color={color}
      onClick={() => setShowSeconds(show => !show)}
    >
      {showSeconds ? (
        formatTimeWithSeconds(minutesSum, seconds)
      ) : (
        <>
          {minutesSum}
          <Typography display={'inline'} textAlign="center" variant="body1">
            min
          </Typography>
        </>
      )}
    </Typography>
  );
};
