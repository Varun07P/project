import React from 'react';

const Newsletter = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="text-gray-600 mb-8">Sign up for deals, new products and promotions</p>
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
          <button className="px-8 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;