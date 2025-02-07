import React, { useState } from 'react';
import { Search, User, Package, Heart, Inbox, ListOrdered, Settings, LogOut, Plus, Edit, Trash2, ChevronLeft, ChevronRight, PenSquare } from 'lucide-react';

// Mock data for initial products
const initialProducts = [
  {
    id: 1,
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: 890.00,
    stock: 63,
    colors: ["black", "silver", "pink"],
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Microsoft Headquare",
    category: "Digital Product", 
    price: 190.00,
    stock: 13,
    colors: ["black", "pink", "gold", "yellow"],
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop"
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('stock');
  const [products, setProducts] = useState(initialProducts);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const stats = {
    totalUsers: 40689,
    totalOrders: 10293,
    totalSales: 89000,
    totalPending: 2040
  };

  const Sidebar = () => (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-6">
      <div className="text-2xl font-bold mb-10">3legant.</div>
      <nav className="space-y-2">
        {[
          { icon: Package, label: 'Dashboard', value: 'dashboard' },
          { icon: Package, label: 'Products', value: 'products' },
          { icon: Heart, label: 'Favorites', value: 'favorites' },
          { icon: Inbox, label: 'Inbox', value: 'inbox' },
          { icon: ListOrdered, label: 'Order Lists', value: 'orders' },
          { icon: Package, label: 'Product Stock', value: 'stock' },
        ].map(({ icon: Icon, label, value }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
              activeTab === value ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-8 space-y-2">
        <button className="flex items-center space-x-3 w-full p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button className="flex items-center space-x-3 w-full p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  const Header = () => (
    <header className="bg-white p-6 flex justify-between items-center border-b border-gray-200">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div className="flex items-center space-x-3">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-semibold">Moni Roy</div>
          <div className="text-sm text-gray-500">Admin</div>
        </div>
      </div>
    </header>
  );

  const Dashboard = () => (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Total User', value: stats.totalUsers, change: '8.5% Up from yesterday', icon: User },
          { label: 'Total Order', value: stats.totalOrders, change: '1.3% Up from past week', icon: Package },
          { label: 'Total Sales', value: `$${stats.totalSales}`, change: '4.3% Down from yesterday', icon: Package },
          { label: 'Total Pending', value: stats.totalPending, change: '1.8% Up from yesterday', icon: Package }
        ].map(({ label, value, change, icon: Icon }) => (
          <div key={label} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500">{label}</div>
                <div className="text-2xl font-bold mt-2">{value}</div>
                <div className="text-sm text-green-500 mt-2">{change}</div>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  const ProductForm = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(
      product || {
        name: '',
        category: '',
        price: '',
        originalPrice: '',
        rating: 0,
        isNew: false,
        discount: 0,
        image: '',
        description: ''
      }
    );
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Call the API to upload the data
      try {
        const response = await fetch('http://localhost:3000/api/products/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          onSubmit(formData); // Pass data to onSubmit if the request is successful
        } else {
          console.error('Failed to submit product.');
        }
      } catch (error) {
        console.error('Error submitting product:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-1 focus:ring-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-1 focus:ring-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-1 focus:ring-black"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
          <input
            type="number"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-1 focus:ring-black"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <input
            type="number"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-1 focus:ring-black"
            required
            min="0"
            max="5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
          <input
            type="number"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-1 focus:ring-black"
            required
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Is New?</label>
          <input
            type="checkbox"
            checked={formData.isNew}
            onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
            className="mt-1 block"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-1 focus:ring-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-1 focus:ring-black"
            required
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            {product ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </form>
    );
  };
  
  

  const ProductStock = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Stock</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search product name"
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Image</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Product Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Available Colors</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-1">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <PenSquare size={20} />
                    </button>
                    <button
                      onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1-{products.length} of {products.length}
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Products = () => {
    const handleAddProduct = (data) => {
      const newProduct = {
        ...data,
        id: products.length + 1,
        colors: data.colors || ['black'], // Default color if none provided
      };
      setProducts([...products, newProduct]);
      setIsAddingProduct(false); // Hide the form after adding
    };

    const handleUpdateProduct = (data) => {
      setProducts(products.map(p => p.id === data.id ? data : p));
      setEditingProduct(null); // Hide the form after updating
    };

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            onClick={() => setIsAddingProduct(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <Plus size={20} />
            <span>Add New Product</span>
          </button>
        </div>

        {isAddingProduct && (
          <ProductForm
            onSubmit={handleAddProduct}
            onCancel={() => setIsAddingProduct(false)}
          />
        )}

        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleUpdateProduct}
            onCancel={() => setEditingProduct(null)}
          />
        )}

        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-500">${product.price}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <PenSquare size={20} />
                  </button>
                  <button
                    onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'products' && <Products />}
        {activeTab === 'stock' && <ProductStock />}
      </div>
    </div>
  );
}

export default App;