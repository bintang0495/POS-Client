import { Grid, Typography } from '@mui/material';
import React from 'react';

const Profile = ({ user }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography variant='body2'>Name</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant='body2'>: {user?.user.full_name}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='body2'>Email</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant='body2'>: {user?.user.email}</Typography>
      </Grid>
    </Grid>
  );
};

export default Profile;
