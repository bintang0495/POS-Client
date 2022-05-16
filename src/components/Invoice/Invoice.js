import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getInvoice } from '../../actions/order';

const Invoice = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoiceReducers);
  useEffect(() => {
    dispatch(getInvoice(id));
  }, [id, dispatch]);

  return (
    <Container maxWidth='md'>
      <Grid container mb={2} borderBottom={1} paddingBottom={2}>
        <Grid item xs={12} sx={{ py: 3 }}>
          <Typography variant='h4'>Invoice</Typography>
        </Grid>
      </Grid>
      <Grid container mb={2} borderBottom={1} paddingBottom={2}>
        <Grid item xs={6}>
          <Typography variant='body1' fontWeight={'bold'}>
            Status
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1'>{invoice.order.status}</Typography>
        </Grid>
      </Grid>
      <Grid container mb={2} borderBottom={1} paddingBottom={2}>
        <Grid item xs={6}>
          <Typography variant='body1' fontWeight={'bold'}>
            Order ID
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1'>#{invoice.order.order_number}</Typography>
        </Grid>
      </Grid>
      <Grid container mb={2} borderBottom={1} paddingBottom={2}>
        <Grid item xs={6}>
          <Typography variant='body1' fontWeight={'bold'}>
            Billied To
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1' fontWeight={'bold'}>
            {invoice.user.full_name.toUpperCase()}
          </Typography>
          <Typography variant='body1'>{invoice.user.email}</Typography>
          <Typography variant='body1' mt={3}>
            {invoice.order.delivery_address.provinsi +
              ',' +
              invoice.order.delivery_address.kabupaten +
              ',' +
              invoice.delivery_address.kecamatan +
              ',' +
              invoice.delivery_address.kelurahan +
              ',' +
              invoice.delivery_address.detail}
          </Typography>
        </Grid>
      </Grid>
      <Grid container mb={2} borderBottom={1} paddingBottom={2}>
        <Grid item xs={6}>
          <Typography variant='body1' fontWeight={'bold'}>
            Payment To
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1'>Edy Hartono</Typography>
          <Typography variant='body1'>edyh@gmail.com</Typography>
          <Typography variant='body1'>BCA</Typography>
          <Typography variant='body1'>XXXX-XXXXXXX-333-34</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Invoice;
