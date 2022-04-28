import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Profile from './Profile/Profile';
import Pemesanan from './Pemesanan/Pemesanan';
import Alamat from './Alamat/Alamat';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/auth';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Account = () => {
  const [value, setValue] = React.useState(0);
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useNavigate();
  const signOut = () => {
    dispatch(logout(history));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography
        variant='body2'
        align='center'
        sx={{
          border: 1,
          borderRadius: '3px',
          background: '#595548',
          color: 'white',
          padding: '2px 0px',
        }}
        mb={2}>
        Account
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: 224,
        }}>
        <Tabs
          orientation='vertical'
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            width: '20%',
          }}>
          <Tab label='Profile' {...a11yProps(0)} />
          <Tab label='Pemesanan' {...a11yProps(1)} />
          <Tab label='Alamat' {...a11yProps(2)} />
          <Tab label='Logout' onClick={signOut} />
        </Tabs>
        <div style={{ marginTop: '10px', marginLeft: '20px' }}>
          {value === 0 && <Profile user={user} />}
          {value === 1 && <Pemesanan />}
          {value === 2 && <Alamat />}
        </div>
        {/* <TabPanel value={value} index={0}>
          <Profile user={user} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Pemesanan />
          Pemesanan
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Alamat />
          Alamat
        </TabPanel> */}
      </Box>
    </>
  );
};

export default Account;
