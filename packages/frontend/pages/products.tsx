import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(''); // Assume passed from login or localStorage
  const [form, setForm] = useState({ code: '', name: '', description: '', rate: 0, image: '' });

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:3000/products', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setProducts(res.data));
    }
  }, [token]);

  const handleCreate = async () => {
    await axios.post('http://localhost:3000/products', form, { headers: { Authorization: `Bearer ${token}` } });
    // Refresh list
  };

  // Similar for update/delete

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((p: any) => (
          <li key={p.id}>{p.name} - {p.rate}</li>
        ))}
      </ul>
      {/* Form inputs for CRUD */}
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default ProductsPage;