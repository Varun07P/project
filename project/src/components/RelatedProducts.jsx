import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ products }) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleProducts = products.slice(startIndex, startIndex + 4);

  const slideLeft = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };

  const slideRight = () => {
    setStartIndex(Math.min(products.length - 4, startIndex + 1));
  };

  return (
    <div className="relative">
      <div className="flex gap-6">
        {visibleProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="flex-1 group"
          >
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
                <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-xs">
                  -{product.discount}%
                </span>
              )}
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
        ))}
      </div>

      {startIndex > 0 && (
        <button
          onClick={slideLeft}
          className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      
      {startIndex < products.length - 4 && (
        <button
          onClick={slideRight}
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default RelatedProducts;