import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { formatThousand, ongkir, totalHargaCart } from '../../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { addOrder } from '../../../actions/order';

const ConfirmOrder = () => {
  const address = useSelector((state) => state.addressReducers);
  const carts = useSelector((state) => state.cartReducers);
  const detailAlamat = address.map(
    (row) =>
      row.provinsi +
      ',' +
      row.kabupaten +
      ',' +
      row.kecamatan +
      ',' +
      row.kelurahan +
      ',' +
      row.detail
  );
  const totalPembayaran = ongkir + totalHargaCart(carts);
  const formData = {
    delivery_fee: totalPembayaran,
    delivery_address: detailAlamat,
  };
  const history = useNavigate();

  const dispatch = useDispatch();

  return (
    <Container maxWidth='md'>
      <Grid container mb={2} borderBottom={1} paddingBottom={2}>
        <Grid item xs={12} sx={{ py: 3 }}>
          <Typography variant='h4'>Konfirmasi</Typography>
        </Grid>
      </Grid>
      <Grid container mb={2} borderBottom={1} paddingBottom={2}>
        <Grid item xs={6}>
          <Typography variant='body1'>Alamat</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1'>{detailAlamat}</Typography>
        </Grid>
      </Grid>
      <Grid container mb={2} borderBottom={1} paddingBottom={2}>
        <Grid item xs={6}>
          <Typography variant='body1'>Total Harga</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1'>
            {formatThousand(totalHargaCart(carts))}
          </Typography>
        </Grid>
      </Grid>
      <Grid container mb={2} borderBottom={1} paddingBottom={2}>
        <Grid item xs={6}>
          <Typography variant='body1'>Ongkir</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1'>{formatThousand(ongkir)}</Typography>
        </Grid>
      </Grid>
      <Grid container mb={2} paddingBottom={2}>
        <Grid item xs={6}>
          <Typography variant='body1' fontWeight={'bold'}>
            Total
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1' fontWeight={'bold'}>
            {formatThousand(totalPembayaran)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container mb={2} paddingBottom={2}>
        <Grid item xs={6}>
          <Button
            variant='contained'
            color='inherit'
            component={Link}
            to='/cart'>
            Kembali
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Button
            variant='contained'
            color='success'
            onClick={() => dispatch(addOrder(formData, history))}>
            Process
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConfirmOrder;
