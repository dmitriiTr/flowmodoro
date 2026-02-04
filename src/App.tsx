import { Box, Grid, Paper } from '@mui/material';

import Clock from './Clock';
import { Page } from './enums';
import Results from './Results';
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
