import React from 'react';
import { Truck, RefreshCcw, Shield, Phone } from 'lucide-react';

const Features = () => {
  return (
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 py-16 border-t border-gray-200">
      <div className="flex items-center space-x-4">
        <Truck className="w-8 h-8" />
        <div>
          <h3 className="font-semibold">Free Shipping</h3>
          <p className="text-sm text-gray-600">Order above $200</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <RefreshCcw className="w-8 h-8" />
        <div>
          <h3 className="font-semibold">Money-back</h3>
          <p className="text-sm text-gray-600">30 days guarantee</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Shield className="w-8 h-8" />
        <div>
          <h3 className="font-semibold">Secure Payments</h3>
          <p className="text-sm text-gray-600">Secured by Stripe</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Phone className="w-8 h-8" />
        <div>
          <h3 className="font-semibold">24/7 Support</h3>
          <p className="text-sm text-gray-600">Phone and Email support</p>
        </div>
      </div>
    </div>
  );
};

export default Features;