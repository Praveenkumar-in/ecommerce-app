
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Order from './pages/Order';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import SearchBar from './component/SearchBar';
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";


const App = () => {
  return (
    <div className='px-4 sm:px-[vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <SearchBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/order' element={<Order />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
