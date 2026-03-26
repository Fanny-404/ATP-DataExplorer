import React, { useState } from 'react';
import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { ProductDetail } from './ProductDetail';
import '../styles/ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, viewMode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>No products found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <>
      <div className={`product-${viewMode}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={setSelectedProduct}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
};
