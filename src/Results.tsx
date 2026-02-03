import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';

import { Activity, Task } from './types';
import Button from '@mui/material/Button';
import { TasksTable } from './TasksTable';
import { activities } from './constants';

interface ResultsProps {
  goToClock: VoidFunction;
  handleActivitySelect: (activity: Activity) => void;
  activity: Activity;
  tasks: Task[];
}

const Results = ({
  goToClock,
  activity,
  handleActivitySelect,
  tasks
}: ResultsProps) => {
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
