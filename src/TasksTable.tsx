import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { Task } from './types';
import { secondsToRoundedMinutes } from './utils';

export const TasksTable = ({ tasks }: { tasks: Task[] }) => {
  const tasksGrouped = Object.entries(
    Object.groupBy(tasks, task => task.day) as Record<string, Task[]>
  );

  const tasksMapped: Task[] = tasksGrouped.map(([day, tasks]) => {
    return {
      day,
      time: tasks.reduce((a, b) => a + b.time, 0) ?? 0,
      activity: tasks[0].activity,
    };
  });
  return (
    <TableContainer
      sx={theme => ({
        [theme.breakpoints.down('sm')]: { height: 250, margin: 2 },
        [theme.breakpoints.up('sm')]: { height: 390 },
      })}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasksMapped.map(task => (
            <TableRow key={task.day}>
              <TableCell component="th" scope="row">
                {task.day}
              </TableCell>
              <TableCell key={task.activity} component="th" scope="row">
                {task.activity}
              </TableCell>
              <TableCell component="th" scope="row">
                {secondsToRoundedMinutes(task.time)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
