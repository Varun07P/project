import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { product } from '../data/products';
import { useCart } from '../context/CartContext';
import RelatedProducts from '../components/RelatedProducts';
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedImage, setSelectedImage] = React.useState(0);

  // const currentProduct = product.find(p => p.id === id);
  const [currentProduct, setCurrentProduct] = useState({})
  const relatedProducts = product.filter(p => 
    p.category === currentProduct?.category && p.id !== currentProduct.id
  );

  if (!currentProduct) {
    return <div>Product not found</div>;
  }

  const images = [currentProduct.image, ...Array(3).fill(currentProduct.image)];

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart(currentProduct, quantity);
  };

  const totalPrice = currentProduct.price * quantity;

  useEffect(()=>{
    const fetchdata = async() =>{
      try {
        const responce = await axios.get(`http://localhost:4000/api/products/${id}`)
        if(responce.status == 200){
          console.log(responce.data);
          setCurrentProduct(responce.data)
        }
      } catch (error) {
        console.log('fetch error = ', error);
      }
    }
    fetchdata();
  }, [])
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm mb-8">
        <Link to="/" className="text-gray-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="text-gray-500">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-black">{currentProduct.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={images[selectedImage]}
              alt={currentProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === idx ? 'border-black' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`${currentProduct.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{currentProduct.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex">
              {[...Array(currentProduct.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-500">12 reviews</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
            {currentProduct.originalPrice && (
              <span className="text-xl text-gray-500 line-through">
                ${(currentProduct.originalPrice * quantity).toFixed(2)}
              </span>
            )}
            {currentProduct.discount && (
              <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
                -{currentProduct.discount}%
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-8">{currentProduct.description}</p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border rounded">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
            <button className="p-3 border rounded hover:bg-gray-100">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 border rounded hover:bg-gray-100">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="border-t pt-8">
            <h3 className="font-semibold mb-2">Product Details:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Material: Premium fabric</li>
              <li>Dimensions: Please check product dimensions</li>
              <li>Care instructions: Professional cleaning recommended</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="border-t pt-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;