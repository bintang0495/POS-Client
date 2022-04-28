import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchCart } from '../../actions/cart';
import { urlServer } from '../../constants/urlServer';
import { formatThousand } from '../../utils';

const Cart = () => {
  const carts = useSelector((state) => state.cartReducers);
  const dispatch = useDispatch();
  return (
    <Container sx={{ py: 2 }} maxWidth='md'>
      <Grid container spacing={4}>
        {carts?.map((cart) => (
          <Grid item key={cart.product._id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component='img'
                alt='green iguana'
                height='250'
                image={`${urlServer}/imgProduct/${cart.product.image_url}`}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {cart.product.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {cart.product.description}
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  {formatThousand(cart.product.price)}
                </Typography>
                <Typography align='center' variant='body1' mt={3}>
                  <Button
                    color='inherit'
                    variant='contained'
                    sx={{ marginRight: '18%' }}
                    onClick={() => dispatch(patchCart(cart.product, false))}>
                    {' '}
                    -{' '}
                  </Button>
                  {' ' + cart.qty + ' '}
                  <Button
                    color='inherit'
                    variant='contained'
                    sx={{ marginLeft: '18%' }}
                    onClick={() => dispatch(patchCart(cart.product))}>
                    {' '}
                    +{' '}
                  </Button>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant='contained'
                  color='warning'
                  fullWidth
                  onClick={() => {}}>
                  Checkout
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cart;
