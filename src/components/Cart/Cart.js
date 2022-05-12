import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchCart } from '../../actions/cart';
import { urlServer } from '../../constants/urlServer';
import { formatThousand, totalHargaCart, totalItemCart } from '../../utils';
import { Link } from 'react-router-dom';

const Cart = () => {
  const carts = useSelector((state) => state.cartReducers);
  const address = useSelector((state) => state.addressReducers);
  const dispatch = useDispatch();

  return (
    <Container sx={{ py: 2 }} maxWidth='md'>
      {carts.length === 0 ? (
        <Typography variant='h5' align='center'>
          Tambahkan barang ke cart terlebih dahulu
        </Typography>
      ) : (
        <>
          <Typography variant='h5'>
            Total : {formatThousand(totalHargaCart(carts))}
          </Typography>
          <Grid container spacing={3} mb={2} mt={1}>
            <Grid item xs={2} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Gambar
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                paddingTop: '3000px',
                fontWeight: 'bold',
              }}>
              Barang
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                paddingTop: '3000px',
                fontWeight: 'bold',
              }}>
              Harga
            </Grid>
            <Grid item xs={4} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Qty
            </Grid>
          </Grid>
          {carts?.map((cart) => (
            <Grid container spacing={3} mt={0.5} border={1} borderRadius={2}>
              <Grid item xs={2}>
                <img
                  src={`${urlServer}/imgProduct/${cart.product.image_url}`}
                  alt={cart.product.name}
                  style={{ height: '100px', width: '100px' }}
                />
              </Grid>
              <Grid item xs={4} sx={{ paddingTop: '3000px' }}>
                {cart.product.name}
              </Grid>
              <Grid item xs={2} sx={{ paddingTop: '3000px' }}>
                {formatThousand(cart.product.price)}
              </Grid>
              <Grid item xs={4}>
                <Typography align='center' variant='body1'>
                  <Button
                    color='inherit'
                    variant='contained'
                    sx={{ marginRight: '20px' }}
                    onClick={() => dispatch(patchCart(cart.product, false))}>
                    {' '}
                    -{' '}
                  </Button>
                  {' ' + cart.qty + ' '}
                  <Button
                    color='inherit'
                    variant='contained'
                    sx={{ marginLeft: '20px' }}
                    onClick={() => dispatch(patchCart(cart.product))}>
                    {' '}
                    +{' '}
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          ))}
          {address?.length > 0 ? (
            <Grid spacing={3} container mt={0.5}>
              <Button
                variant='contained'
                color='warning'
                component={Link}
                to='/confirmOrder'
                fullWidth>
                Checkout
              </Button>
            </Grid>
          ) : (
            <>
              <Grid spacing={3} container mt={0.5}>
                <Button variant='contained' color='warning' fullWidth disabled>
                  Checkout
                </Button>
              </Grid>
              <Grid spacing={3} container mt={0.5}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Typography variant='body2' sx={{ color: 'red' }}>
                    Silahkan tambahkan alamat terlebih dahulu pada profil {'>'}{' '}
                    Alamat
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Cart;
