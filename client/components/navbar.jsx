import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg" justifyContent="center">
        <Toolbar disableGutters>
          <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          >
            <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              fontFamily: 'Titan One',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
              RunningFuze
            </Typography>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
