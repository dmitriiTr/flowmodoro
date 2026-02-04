import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import { TasksContext } from '../TasksContextProvider';

import { Activity } from '../types';
import Button from '@mui/material/Button';
import { TasksTable } from './TasksTable';
import { activities } from '../constants';
import { useContext } from 'react';

interface ResultsProps {
  goToClock: VoidFunction;
}

const Results = ({ goToClock }: ResultsProps) => {
  const { tasks, activity, handleActivitySelect } = useContext(
    TasksContext
  )!;

  const onChangeActivity = (e: SelectChangeEvent) => {
    handleActivitySelect(e.target.value as Activity);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Button variant="contained" onClick={() => goToClock()}>
        Start
      </Button>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="activity-label">Activity</InputLabel>
        <Select
          labelId="activity-label"
          value={activity}
          onChange={onChangeActivity}
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
  );
};

export default Results;
