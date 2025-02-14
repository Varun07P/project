import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import NewArrivals from './components/NewArrivals';
import Features from './components/Features';
import Newsletter from './components/Newsletter';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { CartProvider } from './context/CartContext';
import Footer from './components/Footer';
import PrivateRoute from './components/privateroute/PrivateRoute';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={
             <PrivateRoute>

            <main>
                <Hero />
                <Categories />
                <NewArrivals />
                <Features />
                <Newsletter />
              </main>
             </PrivateRoute>
            } />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Footer/>
        </div>
      </CartProvider>
    </Router>

  );
}

export default App;