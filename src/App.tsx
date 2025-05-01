import { Activity, Task } from './types';
import { BASE_FOCUS_DURATION_MINUTES, activities } from './constants';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { nowString, secondsToRoundedMinutes } from './utils';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Stopwatch from './Stopwatch';
import { TasksTable } from './TasksTable';
import Timer from './Timer';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [activity, setActivity] = useState<Activity>('work');
  const [showTimer, setShowTimer] = useState(true);
  const [lastFocusTime, setLastFocus] = useState<null | number>(null);
  const [baseFocusTime, setBaseFocusTime] = useState(
    BASE_FOCUS_DURATION_MINUTES
  );

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsed = JSON.parse(storedTasks) as Task[];
      setTasks(parsed);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', e => {
      e.preventDefault();
    });
  }, []);

  const handleStart = () => {
    setShowTimer(true);
  };

  const handleReturn = () => {
    setShowTimer(false);
    setLastFocus(null);
  };

  const handleExitTimer = () => {
    setLastFocus(null);
  };

  const handleExitStopwatch = (time: number, newBaseDuration: number) => {
    setBaseFocusTime(newBaseDuration);
    setTasks(tasks => {
      const updatedTasks = tasks.concat([
        {
          activity,
          time,
          day: nowString(),
        },
      ]);

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setLastFocus(time);
  };

  const handleActivitySelect = (e: SelectChangeEvent) =>
    setActivity(e.target.value as Activity);

  const totalTimeForCurrentActivityToday = tasks
    .filter(t => t.day === nowString() && t.activity === activity)
    .reduce((a, b) => a + b.time, 0);

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Paper
            elevation={4}
            sx={theme => ({
              [theme.breakpoints.down('sm')]: { width: 350, height: 350 * 1.4 },
              [theme.breakpoints.up('sm')]: { width: 500, height: 500 * 1.4 },
            })}
          >
            <Box
              pt={15}
              m={2}
              display={'flex'}
              flexDirection={'column'}
              gap={5}
              justifyContent={'start'}
            >
              {showTimer ? (
                <>
                  {lastFocusTime ? (
                    <>
                      <Box height={65}>
                        <Typography
                          textAlign="center"
                          color="textSecondary"
                          variant="h4"
                        >
                          Task: Rest
                        </Typography>
                        <Typography
                          textAlign="center"
                          color="textSecondary"
                          variant="subtitle2"
                        >
                          focused for{' '}
                          {secondsToRoundedMinutes(
                            totalTimeForCurrentActivityToday
                          )}{' '}
                          min
                        </Typography>
                      </Box>
                      <Timer
                        lastFocus={lastFocusTime}
                        handleExit={handleExitTimer}
                      />
                    </>
                  ) : (
                    <>
                      <Box height={65}>
                        <Typography
                          textAlign="center"
                          color="textSecondary"
                          variant="h4"
                        >
                          Task: {activity}
                        </Typography>
                      </Box>
                      <Stopwatch
                        handleExit={handleExitStopwatch}
                        baseDuration={baseFocusTime}
                      />
                    </>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={() => handleReturn()}>
                      Exit
                    </Button>
                  </Box>
                </>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button variant="contained" onClick={() => handleStart()}>
                    Start
                  </Button>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="activity-label">Activity</InputLabel>
                    <Select
                      labelId="activity-label"
                      value={activity}
                      onChange={handleActivitySelect}
                      label="Activity"
                    >
                      {activities.map(a => (
                        <MenuItem key={a} value={a}>
                          {a}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TasksTable tasks={tasks.toReversed()} />
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
