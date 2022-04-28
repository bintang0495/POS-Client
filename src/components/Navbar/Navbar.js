import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
// import TabComponent from './TabComponent';
import { deepOrange } from '@mui/material/colors';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { totalItemCart } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../actions/cart';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = ({ setKeySearch }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const carts = useSelector((state) => state.cartReducers);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    //JWT
    setUser(JSON.parse(localStorage.getItem('profile')));
    if (user?.user) {
      dispatch(getCart());
    }
  }, [location, dispatch]);

  const handleChange = (e) => {
    setKeySearch(e.target.value);
  };
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
      <AppBar
        position='static'
        sx={{
          background: 'white',
          color: '#ed6c02',
        }}>
        <Toolbar>
          <IconButton component={Link} to='/' color='warning'>
            <LocalDiningIcon />
            <Typography
              sx={{ fontFamily: 'cursive' }}
              variant='h6'
              marginLeft='8px'
              noWrap
              component='div'>
              POS System
            </Typography>
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
            />
          </Search>

          {user?.user ? (
            <>
              <IconButton
                sx={{
                  marginLeft: 'auto',
                }}
                component={Link}
                color='success'
                to='/cart'>
                <Badge
                  badgeContent={
                    totalItemCart(carts) > 0 ? totalItemCart(carts) : null
                  }
                  color='error'>
                  <LocalGroceryStoreIcon />
                </Badge>
              </IconButton>

              <IconButton
                sx={{
                  marginLeft: '20px',
                }}
                component={Link}
                to='/account'>
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  alt={user?.user.full_name}>
                  {user?.user.full_name.charAt(0)}
                </Avatar>
              </IconButton>
            </>
          ) : (
            <Button
              sx={{
                marginLeft: 'auto',
              }}
              component={Link}
              to='/auth'
              variant='contained'
              color='warning'>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
