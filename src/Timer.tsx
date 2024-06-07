import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Time } from './Time';
import Typography from '@mui/material/Typography';
import { alarm } from './constants';
import { getTimeRest } from './utils';
import { useTimer } from 'react-timer-hook';

interface TimerProps {
  handleExit: () => void,
  lastFocus: number
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Timer = (props: TimerProps) => {
  const { handleExit, lastFocus } = props;

  const onExpire = () => {
    alarm.play();
  };

  const {
    seconds,
    minutes,
    hours
  } = useTimer({
    autoStart: true,
    expiryTimestamp: getTimeRest(lastFocus),
    onExpire
  });

  const handleExitClick = () => {
    handleExit();
  };

  const isTimeUp = hours === 0 && minutes === 0 && seconds === 0;

  return (
    <Box display='flex' flexDirection='column' pt={6}
      alignItems="center" justifyContent="center">
      <Box height={110}>
        {isTimeUp
          ? <Typography display={'inline'} textAlign='center' variant='h2'>
            Time's Up
          </Typography>
          : <Time hours={hours} minutes={minutes} seconds={seconds} />}
      </Box>
      <Button variant='outlined' onClick={() => handleExitClick()}>
        End rest
      </Button>
    </Box>
  );
};

export default Timer;