import React, { useState, useEffect } from 'react';
import API from '../api';
import { Plus, Minus, Trash2, Droplet, Bed, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ itemName: '', type: 'Blood', quantity: 0 });

  const fetchItems = async () => {
    try {
      const { data } = await API.get('/inventory');
      setItems(data);
    } catch (error) { alert('Failed to load inventory'); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/inventory/add', form);
      setShowForm(false);
      fetchItems();
      setForm({ itemName: '', type: 'Blood', quantity: 0 });
    } catch (error) { alert('Error adding item'); }
  };

  const updateQuantity = async (id, currentQty, change) => {
    try {
      const newQty = parseInt(currentQty) + change;
      if (newQty < 0) return;
      await API.put(`/inventory/${id}`, { quantity: newQty });
      fetchItems();
    } catch (error) { alert('Error updating quantity'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      await API.delete(`/inventory/${id}`);
      fetchItems();
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 bg-white rounded-full hover:bg-gray-200">
            <ArrowLeft />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Hospital Inventory</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg">
          <Plus size={20} /> Add Item
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border-t-4 border-blue-600 animate-fade-in">
          <h3 className="text-lg font-bold mb-4">Add New Stock</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input required placeholder="Item Name (e.g. A+ Blood)" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setForm({...form, itemName: e.target.value})} />
            <select className="p-3 border rounded-lg" onChange={e => setForm({...form, type: e.target.value})}>
              <option value="Blood">Blood Supply</option>
              <option value="Bed">Hospital Bed</option>
            </select>
            <input required type="number" placeholder="Quantity" className="p-3 border rounded-lg" onChange={e => setForm({...form, quantity: e.target.value})} />
            <button type="submit" className="bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">Save Item</button>
          </form>
        </div>
      )}

      {/* RESPONSIVE GRID RULE APPLIED HERE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className={`p-5 rounded-xl shadow-sm border-l-4 flex justify-between items-center bg-white hover:shadow-md transition 
            ${item.type === 'Blood' ? 'border-red-500' : 'border-blue-500'}`}>
            
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${item.type === 'Blood' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                {item.type === 'Blood' ? <Droplet size={20} /> : <Bed size={20} />}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 leading-tight">{item.itemName}</h3>
                <p className="text-xs text-gray-400">{item.type}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border">
                <button onClick={() => updateQuantity(item._id, item.quantity, -1)} className="p-1 hover:bg-gray-200 rounded text-gray-500"><Minus size={14}/></button>
                <span className="font-bold text-md min-w-[20px] text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity, 1)} className="p-1 hover:bg-gray-200 rounded text-gray-500"><Plus size={14}/></button>
              </div>
              <button onClick={() => handleDelete(item._id)} className="text-[10px] text-red-400 hover:text-red-600 uppercase font-bold tracking-wider">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;