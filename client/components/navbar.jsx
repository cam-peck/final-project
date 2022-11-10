import React from 'react';
import { AppBar, Container, Grid, Toolbar, Typography, Button } from '@mui/material';
import { AppContext } from '../lib';

export default class Navbar extends React.Component {

  render() {
    const { handleSignOut } = this.context;
    return (
      <AppBar position="sticky" top={0} left={0} right={0}>
        <Container maxWidth="lg" justifyContent="center">
          <Toolbar disableGutters>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
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
              <Button variant="contained" type="button" sx={{ p: 1.2, borderRadius: 2 }} onClick={handleSignOut}>
                Sign out
              </Button>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
Navbar.contextType = AppContext;
