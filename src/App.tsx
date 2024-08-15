import { Activity, TasksWithDay } from './types';
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
import { activities, baseMinDuration } from './constants';
import { emptyTodayTask, nowString, secondsToRoundedMinutes } from './utils';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Stopwatch from './Stopwatch';
import { TasksTable } from './TasksTable';
import Timer from './Timer';

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = () => {
  const [tasks, setTasks] = useState<TasksWithDay[]>([]);

  const [activity, setActivity] = useState<Activity>('work');
  const [showTimer, setShowTimer] = useState(true);
  const [lastFocusTime, setLastFocus] = useState<null | number>(null);
  const [baseFocusTime, setBaseFocusTime] = useState(baseMinDuration);

  const isSameDay = tasks[tasks.length - 1]?.day === nowString();
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsed = JSON.parse(storedTasks) as TasksWithDay[];
      //if today is now stored adding today
      if (!parsed.find(t => t.day === nowString())) {
        setTasks(parsed.concat([emptyTodayTask()]));
      } else {
        setTasks(parsed);
      }
    }
    else {
      setTasks([emptyTodayTask()]);
    }

  }, [isSameDay]);

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

  const handleExitStopwatch = (seconds: number, newBaseDuration: number) => {
    setBaseFocusTime(newBaseDuration);
    setTasks(tasks => {
      const updatedTasks = tasks.map(t => {
        if (t.day === nowString()) {
          return {
            day: t.day,
            tasks: t.tasks.map(task => task.activity === activity
              ? { ...task, time: task.time + seconds }
              : task)
          };
        }
        else {
          return t;
        }
      });

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setLastFocus(seconds);
  };

  const handleActivitySelect = (e: SelectChangeEvent) =>
    setActivity(e.target.value as Activity);

  const selectedTask = tasks
    .find(a => a.day === nowString())
    ?.tasks.find(t => t.activity === activity);

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
          <Paper elevation={4}
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: { width: 350, height: 350 * 1.4 },
              [theme.breakpoints.up('sm')]: { width: 500, height: 500 * 1.4 },
            })}
          >
            <Box pt={15} m={2} display={'flex'} flexDirection={'column'}
              gap={5} justifyContent={'start'}>
              {showTimer
                ? <>
                  {lastFocusTime
                    ? <>
                      <Box height={65}>
                        <Typography textAlign='center'
                          color='textSecondary' variant="h4">
                          Task: Rest
                        </Typography>
                        <Typography textAlign='center'
                          color='textSecondary' variant="subtitle2">
                          focused for{' '}
                          {secondsToRoundedMinutes(selectedTask?.time ?? 0)} min
                        </Typography>
                      </Box>
                      <Timer
                        lastFocus={lastFocusTime}
                        handleExit={handleExitTimer}
                      />
                    </>
                    : <>
                      <Box height={65}>
                        <Typography textAlign='center'
                          color='textSecondary' variant="h4">
                          Task: {selectedTask?.activity}
                        </Typography>
                      </Box>
                      <Stopwatch
                        handleExit={handleExitStopwatch}
                        baseDuration={baseFocusTime}
                      />
                    </>}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Button variant='contained' onClick={() => handleReturn()}>
                      Exit
                    </Button>
                  </Box>
                </>
                : <Box display='flex' flexDirection='column'
                  alignItems="center" justifyContent="center">
                  <Button variant='contained' onClick={() => handleStart()}>
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
                      {activities.map(a =>
                        <MenuItem key={a} value={a}>{a}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <TasksTable tasks={tasks} />
                </Box>}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Grid >
  );
};

export default App;
