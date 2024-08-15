import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import React from 'react';
import { TasksWithDay } from './types';
import { secondsToRoundedMinutes } from './utils';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TasksTable = React.memo(({ tasks }: { tasks: TasksWithDay[] }) =>
  <TableContainer sx={(theme) => ({
    [theme.breakpoints.down('sm')]: { height: 250, margin: 2 },
    [theme.breakpoints.up('sm')]: { height: 390 },
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
                {secondsToRoundedMinutes(t.time)}
              </TableCell>)}
          </TableRow>))}
      </TableBody>
    </Table>
  </TableContainer>
);