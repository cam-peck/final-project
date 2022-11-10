import React from 'react';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.toggleFalse();
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}
        message= {props.textMessage}
        action={action}
      />
    </div>
  );
}
