import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  PaperProps,
  Select,
  SelectChangeEvent,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Stopwatch from './Stopwatch';
import Timer from './Timer';
import { styled } from '@mui/material/styles';

// eslint-disable-next-line @typescript-eslint/naming-convention
const SizedPaper = styled(Paper)<PaperProps>(() => ({
  width: 500,
  height: 500 * 1.4,
  //color: theme.palette.success.main,
}));

const activities = ['reading', 'work'] as const;
type Activity = typeof activities[number];
export interface Task {
  activity: Activity;
  time: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = () => {
  const [tasks, setTasks] = useState(activities
    .map(activity => ({ activity, time: 0 })) as Task[]);

  const [activity, setActivity] = useState<Activity>('work');
  const [showTimer, setShowTimer] = useState(true);
  const [lastFocus, setLastFocus] = useState<null | number>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('task');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
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
    const updatedTasks = tasks.map(t =>
      t.activity === activity ? { ...t, time: t.time + seconds } : t);
    setLastFocus(seconds);
    setTasks(updatedTasks);
    localStorage.setItem('task', JSON.stringify(updatedTasks));
  };

  const handleActivitySelect = (e: SelectChangeEvent) =>
    setActivity(e.target.value as Activity);

  const selectedTask = tasks.find(a => a.activity === activity);

  const tasksTable = () => <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Activity</TableCell>
          <TableCell align="right">Seconds</TableCell>
        </TableRow>
      </TableHead>
      {tasks.map((task) => (
        <TableRow
          key={task.activity}
        >
          <TableCell component="th" scope="row">
            {task.activity}
          </TableCell>
          <TableCell align="right">
            {task.time}
          </TableCell>
        </TableRow>))}
    </Table>
  </TableContainer>;

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid container md={5} alignItems="center" justifyContent="center">
        <Grid item>
          <SizedPaper elevation={4}>
            <Box pt={25} m={2}>
              {showTimer && selectedTask
                ? <>
                  {lastFocus
                    ? <Timer
                      lastFocus={lastFocus}
                      selectedTask={selectedTask}
                      handleExit={handleExitTimer}
                    />
                    : <Stopwatch
                      selectedTask={selectedTask}
                      handleExit={handleExitStopwatch}
                    />}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                  {tasksTable()}
                </Box>}
            </Box>
          </SizedPaper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;

// useEffect(() => {
//   const keyDownHandler = (e: globalThis.KeyboardEvent) => {
//     if (e.key === 'p') {
//       e.preventDefault();
//       console.log(paused);
//       if (!paused) {
//         setPaused((state) => {
//           console.log(state);
//           return true;
//         });
//         pause();
//         setPaused((state) => {
//           console.log(state);
//           return true;
//         });
//       }
//       else {
//         setPaused(false);
//         console.log('resume');
//         resume();
//       }
//     }
//   }
//   document.addEventListener('keydown', keyDownHandler);
//   return () => {
//     document.removeEventListener('keydown', keyDownHandler);
//   };

// }, [pause, paused, resume]);