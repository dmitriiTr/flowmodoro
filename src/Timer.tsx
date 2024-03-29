import AlarmSound from './alarm.mp3';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Time } from './Time';
import Typography from '@mui/material/Typography';
import { useTimer } from 'react-timer-hook';

const alarm = new Audio(AlarmSound);

interface TimerProps {
  handleExit: () => void,
  lastFocus: number
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Timer = (props: TimerProps) => {
  const { handleExit, lastFocus } = props;

  const timeRest = new Date();
  const restSeconds = lastFocus / 5;
  timeRest.setSeconds(timeRest.getSeconds() + restSeconds);

  const onExpire = () => {
    alarm.play();
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

  const isTimeUp = hours === 0 && minutes === 0 && seconds === 0;

  return (
    <Box display='flex' flexDirection='column' pt={6}
      alignItems="center" justifyContent="center">
      {isTimeUp
        ? <Typography display={'inline'} textAlign='center' variant='h1'>
          Time Up
        </Typography>
        : <Time hours={hours} minutes={minutes} seconds={seconds} />}
      <Button variant='outlined' onClick={() => handleExitClick()}>
        End rest
      </Button>
    </Box>
  );
};

export default Timer;