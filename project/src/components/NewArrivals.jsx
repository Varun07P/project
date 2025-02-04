import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { product } from '../data/products';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NewArrivals = () => {
  const { addToCart } = useCart();
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="container mx-auto px-4 mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">New Arrivals</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 border rounded-full hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 border rounded-full hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 scroll-smooth custom-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {product.map((product) => (
            <div 
              key={product.id} 
              className="flex-none w-[280px] group"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 text-sm rounded">
                      NEW
                    </span>
                  )}
                  {product.discount && (
                    <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-sm rounded">
                      -{product.discount}%
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="absolute bottom-4 left-4 right-4 bg-black text-white py-2 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Add to cart
                  </button>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;