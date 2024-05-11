import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import React from 'react';
import Stopwatch from './Stopwatch';
import Timer from './Timer';

const activities = ['reading', 'work'] as const;
type Activity = typeof activities[number];
export interface Task {
  activity: Activity;
  time: number;
}

export interface TasksWithDay {
  day: string,
  tasks: Task[]
}

const nowString = () =>
  new Date().toLocaleDateString();

const emptyTodayTask = () => ({
  day: nowString(),
  tasks: activities
    .map(activity => ({ activity, time: 0 }))
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = () => {
  const [tasks, setTasks] = useState<TasksWithDay[]>([]);

  const [activity, setActivity] = useState<Activity>('work');
  const [showTimer, setShowTimer] = useState(true);
  const [lastFocus, setLastFocus] = useState<null | number>(null);

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

  const handleExitStopwatch = (seconds: number) => {
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
            <Box pt={15} m={2}>
              {showTimer
                ? <>
                  {lastFocus
                    ? <>
                      <Typography textAlign='center'
                        color='textSecondary' variant="h4">
                        Task: Rest
                      </Typography>
                      <Timer
                        lastFocus={lastFocus}
                        handleExit={handleExitTimer}
                      />
                    </>
                    : <>
                      <Typography textAlign='center'
                        color='textSecondary' variant="h4">
                        Task: {selectedTask?.activity}
                      </Typography>
                      <Stopwatch
                        handleExit={handleExitStopwatch}
                      />
                    </>}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}
                    pt={5}>
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

// eslint-disable-next-line @typescript-eslint/naming-convention
const TasksTable = React.memo(({ tasks }: { tasks: TasksWithDay[] }) =>
  <TableContainer sx={(theme) => ({
    [theme.breakpoints.down('sm')]: { height: 250 },
    [theme.breakpoints.up('sm')]: { height: 360 },
  })} component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Day</TableCell>
          <TableCell>Reading</TableCell>
          <TableCell>Work</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task) => (
          <TableRow
            key={task.day}
          >
            <TableCell component="th" scope="row">
              {task.day}
            </TableCell>
            {task.tasks.map(t =>
              <TableCell key={t.activity} component="th" scope="row">
                {Math.floor(t.time / 60)}
              </TableCell>)}
          </TableRow>))}
      </TableBody>
    </Table>
  </TableContainer>);

export default App;
