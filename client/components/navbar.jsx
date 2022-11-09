import React from 'react';
import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="sticky" top={0} left={0} right={0}>
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
