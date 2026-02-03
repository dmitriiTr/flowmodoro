import { Activity, Task } from './types';
import { BASE_FOCUS_DURATION_MINUTES, LOCAL_STORAGE_KEY } from './constants';
import { Box, Grid, Paper } from '@mui/material';

import Clock from './Clock';
import { Page } from './enums';
import Results from './Results';
import { nowString } from './utils';
import { useState } from 'react';

const App = () => {
  const [page, setPage] = useState(Page.Clock);

  const getTasksFromStorage = () => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTasks ? (JSON.parse(storedTasks) as Task[]) : [];
  };

  const [tasks, setTasks] = useState<Task[]>(getTasksFromStorage);
  const [activity, setActivity] = useState<Activity>('work');
  const [baseFocusTime, setBaseFocusTime] = useState(
    BASE_FOCUS_DURATION_MINUTES
  );

  const goToClock = () => {
    setPage(Page.Clock);
  };

  const goToResults = () => {
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

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
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
                  goToResults={goToResults}
                  totalTimeForCurrentActivityToday={
                    totalTimeForCurrentActivityToday
                  }
                  handleRest={handleRest}
                  baseFocusTime={baseFocusTime}
                />
              ) : (
                <Results
                  handleActivitySelect={handleActivitySelect}
                  goToClock={goToClock}
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
