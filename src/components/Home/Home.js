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
import React, { useEffect, useState } from 'react';
import Tags from './Tags';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getProduct, getTag } from '../../actions/product';
import { urlServer } from '../../constants/urlServer';
import { useNavigate } from 'react-router-dom';
import { patchCart } from '../../actions/cart';
import Category from './Category';
import { formatThousand } from '../../utils';

const Home = ({ keySearch }) => {
  const products = useSelector((state) => state.productReducers);
  const dispatch = useDispatch();
  const [tagValue, setTagValue] = useState([]);
  const [category, setCategory] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useNavigate();
  useEffect(() => {
    dispatch(getProduct({ q: keySearch, tags: tagValue, category }));
    dispatch(getTag(category));
    dispatch(getCategory());
  }, [dispatch, keySearch, tagValue, category]);

  // const handleClick = (e) => {
  //   console.log(card);
  // };

  return (
    <main>
      <Container sx={{ py: 2 }} maxWidth='md'>
        <Category setCategory={setCategory} />
        <Tags tagValue={tagValue} setTagValue={setTagValue} />
        <Grid container spacing={4}>
          {products?.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component='img'
                  alt={product.name}
                  height='250'
                  image={`${urlServer}/imgProduct/${product.image_url}`}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {product.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.description}
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {formatThousand(product.price)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant='contained'
                    color='warning'
                    fullWidth
                    onClick={() => {
                      if (user?.user) {
                        dispatch(patchCart(product));
                      } else {
                        history('/auth');
                      }
                    }}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default Home;
