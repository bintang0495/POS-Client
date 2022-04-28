import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddress } from '../../../actions/address';

const Alamat = () => {
  const [isDisplay, setIsDisplay] = useState(false);
  const address = useSelector((state) => state.addressReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch, isDisplay]);

  const handleClick = () => {
    setIsDisplay(!isDisplay);
  };

  return (
    <>
      <Button variant='contained' color='warning' onClick={handleClick}>
        {address?.length > 0 ? 'Edit' : 'Add'}
      </Button>
      {(isDisplay || address?.length > 0) && (
        <Grid container spacing={4} mt={2} component='form'>
          <Grid item xs={4}>
            <Typography variant='body2'>Provinsi</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='body2'>: TES</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body2'>Kabupaten/Kota</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='body2'>: </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body2'>Kecamatan</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='body2'>: </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body2'>Kelurahan</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='body2'>: </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button
              type='submit'
              variant='contained'
              sx={{ mt: 3, background: '#595548' }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Alamat;
