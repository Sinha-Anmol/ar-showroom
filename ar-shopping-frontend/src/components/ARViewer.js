import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ProductModel from './ProductModel';
import '../App.css'; 

const ARViewer = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>AR Showroom</h1>
      <select
        className="select-product"
        onChange={(e) => setSelectedProduct(e.target.value)}
      >
        <option value="">Select a Product</option>
        {products.map((product) => (
          <option key={product.id} value={product.model}>
            {product.name}
          </option>
        ))}
      </select>

      {selectedProduct && (
        <div className="ar-viewer">
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <ProductModel modelPath={`/models/${selectedProduct}`} />
            <OrbitControls />
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default ARViewer;
