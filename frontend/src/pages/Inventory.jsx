import React, { useState, useEffect } from 'react';
import API from '../api';
import { Plus, Minus, Trash2, Droplet, Bed, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ itemName: '', type: 'Blood', quantity: 0 });

  // Fetch Inventory
  const fetchItems = async () => {
    try {
      const { data } = await API.get('/inventory');
      setItems(data);
    } catch (error) {
      alert('Failed to load inventory');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add New Item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/inventory/add', form);
      alert('Item Added!');
      setShowForm(false);
      fetchItems();
      setForm({ itemName: '', type: 'Blood', quantity: 0 });
    } catch (error) {
      alert('Error adding item');
    }
  };

  // Update Quantity (+ or -)
  const updateQuantity = async (id, currentQty, change) => {
    try {
      const newQty = parseInt(currentQty) + change;
      if (newQty < 0) return; // Prevent negative numbers
      await API.put(`/inventory/${id}`, { quantity: newQty });
      fetchItems();
    } catch (error) {
      alert('Error updating quantity');
    }
  };

  // Delete Item
  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      await API.delete(`/inventory/${id}`);
      fetchItems();
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 bg-white rounded-full hover:bg-gray-200">
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Hospital Inventory</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-lg">
          <Plus size={20} /> Add Item
        </button>
      </div>

      {/* Add Item Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 animate-fade-in border-t-4 border-primary">
          <h3 className="text-xl font-bold mb-4">Add to Stock</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input required placeholder="Item Name (e.g. A+ Blood)" className="p-3 border rounded" 
              onChange={e => setForm({...form, itemName: e.target.value})} />
            
            <select className="p-3 border rounded" onChange={e => setForm({...form, type: e.target.value})}>
              <option value="Blood">Blood Supply</option>
              <option value="Bed">Hospital Bed</option>
            </select>

            <input required type="number" placeholder="Quantity" className="p-3 border rounded" 
              onChange={e => setForm({...form, quantity: e.target.value})} />
            
            <button type="submit" className="bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700">
              Save Item
            </button>
          </form>
        </div>
      )}

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className={`p-6 rounded-xl shadow-sm border-l-4 flex justify-between items-center bg-white 
            ${item.type === 'Blood' ? 'border-red-500' : 'border-blue-500'}`}>
            
            {/* Icon & Name */}
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                ${item.type === 'Blood' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                {item.type === 'Blood' ? <Droplet size={24} /> : <Bed size={24} />}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{item.itemName}</h3>
                <p className="text-sm text-gray-500">{item.type} Stock</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                <button onClick={() => updateQuantity(item._id, item.quantity, -1)} className="p-1 hover:bg-gray-200 rounded"><Minus size={16}/></button>
                <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity, 1)} className="p-1 hover:bg-gray-200 rounded"><Plus size={16}/></button>
              </div>
              <button onClick={() => handleDelete(item._id)} className="text-xs text-red-400 hover:text-red-600 underline">Remove</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;