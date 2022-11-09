import React from 'react';
import { Container, TextField, Box, Button } from '@mui/material';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
      dob: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // server code here
  }

  render() {
    const { action } = this.props; // either sign-in or sign-out
    const { handleChange, handleSubmit } = this;
    const { email, password, displayName, dob } = this.state;
    const formButton = action === 'sign-in'
      ? 'Sign in'
      : 'Create Account';
    const registerAccountInputs = action === 'sign-in'
      ? ''
      : <>
        <TextField fullWidth id="outlined-name-input" label="Display Name" type="text" name="displayName" value={displayName} onChange={handleChange} required />
        <TextField fullWidth id="outlined-birthday-input" label="Date of Birth" type="date" name="dob" value={dob} onChange={handleChange} InputLabelProps={{ shrink: true, required: true }} required />
      </>;
    return (
      <form onSubmit={handleSubmit}>
        <Container maxWidth="sm">
          <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <TextField fullWidth id="outlined-email-input" label="Email" type="text" name="email" value= {email} onChange={handleChange} required/>
            <TextField fullWidth id="outlined-password-input" label="Password" type="password" name= "password" value= {password} onChange={handleChange} required/>
            {registerAccountInputs}
            <Button fullWidth variant="contained" type="submit" sx={{ p: 1.2, borderRadius: 2 }}>
              {formButton}
            </Button>
          </Box>
        </Container>
      </form >
    );
  }
}
