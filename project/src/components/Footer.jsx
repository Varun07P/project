import React from 'react'

function Footer() {
  return (
    <>
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Store Name */}
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold">3legant.</h2>
            <span className="text-gray-400">| Gift & Decoration Store</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-6 text-gray-300 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Home</a>
            <a href="#" className="hover:text-white">Shop</a>
            <a href="#" className="hover:text-white">Product</a>
            <a href="#" className="hover:text-white">Blog</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-4 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">Copyright © 2023 3legant. All rights reserved</p>

          {/* Privacy & Terms */}
          <div className="flex space-x-4 text-gray-300 mt-2 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white font-semibold">Terms of Use</a>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      </footer>
    </>
  )
}

export default Footer