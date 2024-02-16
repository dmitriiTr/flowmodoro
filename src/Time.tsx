import Typography from '@mui/material/Typography';
import { useState } from 'react';

const formatTime = (time: number) => time < 10 ? '0' + time : time;

interface TimeProps {
  hours: number,
  minutes: number,
  seconds: number,
  overtime?: boolean
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Time = (props: TimeProps) => {
  const [showSeconds, setShowSeconds] = useState(true);
  const { hours, minutes, seconds, overtime } = props;

  const minutesSum = minutes + hours * 60;

  return <>
    <Typography display={'inline'} textAlign='center' variant='h1'
      color={overtime ? 'primary' : undefined}
      onClick={() => setShowSeconds(show => !show)}>
      {showSeconds
        ? `${formatTime(minutesSum)}:${formatTime(seconds)}`
        : <>
          {minutesSum}
          <Typography display={'inline'} textAlign='center' variant='body1'>
            min
          </Typography></>}
    </Typography>
  </>;
};
