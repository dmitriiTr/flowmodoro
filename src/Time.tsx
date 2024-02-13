import Typography from '@mui/material/Typography';
import { useState } from 'react';

const formatTime = (time: number) => time < 10 ? '0' + time : time;

interface TimeProps {
  minutes: number
  seconds: number,
  overtime?: boolean
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Time = (props: TimeProps) => {
  const [showSeconds, setShowSeconds] = useState(true);
  const { minutes, seconds, overtime } = props;

  return <>
    <Typography display={'inline'} textAlign='center' variant='h1'
      color={overtime ? 'primary' : undefined}
      onClick={() => setShowSeconds(show => !show)}>
      {showSeconds
        ? `${formatTime(minutes)}:${formatTime(seconds)}`
        : <>
          {minutes}
          <Typography display={'inline'} textAlign='center' variant='body1'>
            min
          </Typography></>}
    </Typography>
  </>;
};
