import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, AllCats, MyProfile, ProductDetail, AllProducts, Cart, ProductsList } from './screens';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/all-categories" element={ <AllCats /> } exact />
      <Route path="/product/:prod_id" element={ <ProductDetail /> } exact />
      <Route path="/all-products/:category" element={ <AllProducts /> } exact />
      <Route path='/my-profile' element={ <MyProfile /> } exact />
      <Route path='/cart' element={ <Cart /> } exact />
      <Route path='/products-list' element={ <ProductsList /> } exact />
    </Routes>
  );
}

export default App;
