import { Activity, Task } from './types';
import { Box, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';

import { BASE_FOCUS_DURATION_MINUTES } from './constants';
import Clock from './Clock';
import { Page } from './enums';
import Results from './Results';
import { nowString } from './utils';

const App = () => {
  const [page, setPage] = useState(Page.Clock);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [activity, setActivity] = useState<Activity>('work');
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
    setPage(Page.Clock);
  };

  const handleReturn = () => {
    setPage(Page.Results);
  };

  const handleRest = (time: number, newBaseDuration: number) => {
    setBaseFocusTime(newBaseDuration);
    setTasks(tasks => {
      const newTaskId = tasks.length + 1;
      const updatedTasks = tasks.concat([
        {
          activity,
          time,
          day: nowString(),
          id: newTaskId,
        },
      ]);

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleActivitySelect = (activity: Activity) => setActivity(activity);

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
              {page === Page.Clock ? (
                <Clock
                  activity={activity}
                  handleReturn={handleReturn}
                  totalTimeForCurrentActivityToday={
                    totalTimeForCurrentActivityToday
                  }
                  handleRest={handleRest}
                  baseFocusTime={baseFocusTime}
                />
              ) : (
                <Results
                  handleActivitySelect={handleActivitySelect}
                  handleStart={handleStart}
                  activity={activity}
                  tasks={tasks}
                />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
