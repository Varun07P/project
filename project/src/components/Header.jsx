import React, { useState } from 'react';
import { Search, ShoppingCart, User, LogOut, Package, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.removeItem('token');
    navigate('/')
    window.location.reload()
  }
  return (
    <>
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">Ecommerce</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-600">Home</Link>
            <Link to="/shop" className="hover:text-gray-600">Shop</Link>
            <Link to="/product" className="hover:text-gray-600">Product</Link>
            <Link to="/contact" className="hover:text-gray-600">Contact Us</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 cursor-pointer" />
            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="relative"
              >
                <User className="w-5 h-5 cursor-pointer" />
              </button>
              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/signin"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Orders
                  </Link>
                  <button
                  onClick={logout}
                    className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5 cursor-pointer" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
            
            {/* Mobile Menu Button - Moved to the end */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="px-4 py-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="px-4 py-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/product" 
                className="px-4 py-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Product
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </header>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;