import { Box, Paper } from '@mui/material';

import Clock from './components/Clock';
import { Page } from './enums';
import Results from './components/Results';
import { useState } from 'react';

const App = () => {
  const [page, setPage] = useState(Page.Clock);

  const goToClock = () => {
    setPage(Page.Clock);
  };

  const goToResults = () => {
    setPage(Page.Results);
  };

  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        elevation={4}
        sx={theme => ({
          [theme.breakpoints.down('sm')]: {
            width: 350,
            height: 350 * 1.4,
          },
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
            <Clock goToResults={goToResults} />
          ) : (
            <Results goToClock={goToClock} />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default App;
