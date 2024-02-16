import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Time } from './Time';
import Typography from '@mui/material/Typography';
import { useTimer } from 'react-timer-hook';

interface TimerProps {
  handleExit: () => void,
  lastFocus: number
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Timer = (props: TimerProps) => {
  const { handleExit, lastFocus } = props;

  const timeRest = new Date();
  const restSeconds = lastFocus / 5; // lastFocus / 5
  timeRest.setSeconds(timeRest.getSeconds() + restSeconds);

  const onExpire = () => {
    console.warn('expired');
  };

  const {
    seconds,
    minutes,
    hours
  } = useTimer({
    autoStart: true,
    expiryTimestamp: timeRest,
    onExpire
  });

  const handleExitClick = () => {
    handleExit();
  };

  return (
    <Box display='flex' flexDirection='column'
      alignItems="center" justifyContent="center">
      <Time hours={hours} minutes={minutes} seconds={seconds} />
      <Button variant='outlined' onClick={() => handleExitClick()}>
        End rest
      </Button>
      <Typography textAlign='center' color="textSecondary" variant="subtitle1">
        rest
      </Typography>
    </Box>
  );
};

export default Timer;