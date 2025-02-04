import React from 'react';
import { categories } from '../data/products';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {categories.map((category) => (
        <div 
          key={category.name} 
          className="relative h-[300px] group cursor-pointer"
          onClick={() => navigate('/shop')}
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg" />
          <div className="absolute bottom-6 left-6">
            <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
            <button className="text-white underline mt-2">Shop Now →</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;