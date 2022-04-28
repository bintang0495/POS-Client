import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Copyright from './components/Footer/Footer';
import Account from './components/Account/Account';
import { useState } from 'react';
import Cart from './components/Cart/Cart';

function App() {
  const [keySearch, setKeySearch] = useState('');
  return (
    <Router>
      <Navbar setKeySearch={setKeySearch} />
      <Routes>
        <Route path='/' element={<Home keySearch={keySearch} />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/account' element={<Account />} />
      </Routes>
      <Copyright sx={{ mt: '20%', mb: 4 }} />
    </Router>
  );
}

export default App;
