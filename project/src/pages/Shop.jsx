import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { product } from '../data/products';
import { Star, Grid, LayoutGrid, List, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [view, setView] = useState('grid');
  const [showMore, setShowMore] = useState(false);

  const ITEMS_PER_PAGE = 8;
  
  const categories = ['All', ...new Set(product.map(item => item.category))];
  
  const priceRanges = [
    { label: 'All Price', value: 'all', min: 0, max: Infinity },
    { label: '$0 - $100', value: 'range1', min: 0, max: 100 },
    { label: '$100 - $500', value: 'range2', min: 100, max: 500 },
    { label: '$500+', value: 'range3', min: 500, max: Infinity }
  ];

  const filteredProducts = product.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const selectedRange = priceRanges.find(range => range.value === selectedPriceRange);
    const matchesPrice = item.price >= selectedRange.min && item.price <= selectedRange.max;
    return matchesCategory && matchesPrice;
  });

  const displayedProducts = showMore ? filteredProducts : filteredProducts.slice(0, ITEMS_PER_PAGE);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[300px] mb-8">
        <img
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Shop Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="text-center">
            <div className="text-sm mb-2">Home * Shop</div>
            <h1 className="text-5xl font-bold mb-4">Shop Page</h1>
            <p className="text-xl">Let's design the place you always imagined.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex gap-4 w-full md:w-auto mb-4 md:mb-0">
            <div className="w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="w-48">
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">Sort by</div>
            <div className="border-l pl-4 flex gap-2">
              <button 
                onClick={() => setView('grid')}
                className={`p-2 ${view === 'grid' ? 'text-black' : 'text-gray-400'}`}
              >
                <Grid size={20} />
              </button>
              <button 
                onClick={() => setView('compact')}
                className={`p-2 ${view === 'compact' ? 'text-black' : 'text-gray-400'}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-2 ${view === 'list' ? 'text-black' : 'text-gray-400'}`}
              >
                <List size={20} />
              </button>
              <button 
                onClick={() => setView('menu')}
                className={`p-2 ${view === 'menu' ? 'text-black' : 'text-gray-400'}`}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid ${
          view === 'grid' ? 'grid-cols-1 md:grid-cols-4' :
          view === 'compact' ? 'grid-cols-2 md:grid-cols-6' :
          'grid-cols-1'
        } gap-6 mb-8`}>
          {displayedProducts.map((product) => (
            <div key={product.id} className="group">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-xs uppercase">
                      New
                    </span>
                  )}
                  {product.discount && (
                    <span className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 text-xs">
                      -{product.discount}%
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="absolute bottom-4 left-4 right-4 bg-black text-white py-2 text-sm rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Add to cart
                  </button>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-sm">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {filteredProducts.length > ITEMS_PER_PAGE && (
          <div className="text-center mb-16">
            <button 
              onClick={() => setShowMore(!showMore)}
              className="px-8 py-2 border border-gray-300 rounded-full hover:bg-black hover:text-white transition"
            >
              {showMore ? 'Show less' : 'Show more'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;