import React, { useState } from 'react';
import type { Product, AIDescriptionResponse } from '../types/product';
import { aiService } from '../services/aiService';
import '../styles/ProductDetail.css';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const [aiDescription, setAIDescription] = useState<AIDescriptionResponse | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState<string | null>(null);

  const handleGenerateAIDescription = async () => {
    try {
      setLoadingAI(true);
      setErrorAI(null);
      const description = await aiService.generateDescription(product);
      setAIDescription(description);
    } catch (error) {
      setErrorAI(error instanceof Error ? error.message : 'Failed to generate description');
    } finally {
      setLoadingAI(false);
    }
  };

  const rating = product.rating?.rate || 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="detail-container">
          <div className="detail-image-section">
            <img
              src={product.image}
              alt={product.title}
              className="detail-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3EImage not available%3C/text%3E%3C/svg%3E';
              }}
            />
            {rating > 4.0 && <div className="detail-badge">⭐ Top Rated</div>}
          </div>

          <div className="detail-content">
            <div className="detail-header">
              <span className="detail-category">{product.category}</span>
              <h1 className="detail-title">{product.title}</h1>
            </div>

            <div className="detail-price-rating">
              <div className="detail-price">${product.price.toFixed(2)}</div>
              {rating > 0 && (
                <div className="detail-rating">
                  ⭐ {rating.toFixed(1)} / 5.0
                  <span className="detail-rating-count">({product.rating?.count || 0} reviews)</span>
                </div>
              )}
            </div>

            <div className="detail-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {aiDescription && (
              <div className="ai-description">
                <div className="ai-header">
                  <div className="ai-badge">✨ AI Enhanced</div>
                  <button
                    className="btn-close-ai"
                    onClick={() => setAIDescription(null)}
                    aria-label="Close AI description"
                  >
                    ✕
                  </button>
                </div>

                <div className="ai-section">
                  <h4>Enhanced Description</h4>
                  <p>{aiDescription.description}</p>
                </div>

                <div className="ai-section">
                  <h4>💡 Shopping Suggestions</h4>
                  <ul className="suggestions-list">
                    {aiDescription.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>

                <div className="ai-section">
                  <h4>📋 Summary</h4>
                  <p>{aiDescription.summary}</p>
                </div>
              </div>
            )}

            {errorAI && <div className="error-message">{errorAI}</div>}

            <div className="detail-actions">
              <button
                className={`btn btn-primary ${loadingAI ? 'loading' : ''}`}
                onClick={handleGenerateAIDescription}
                disabled={loadingAI || !!aiDescription}
                aria-label="Generate AI description"
              >
                {loadingAI ? '⏳ Generating...' : '🤖 Generate AI Description'}
              </button>
              <button
                className="btn btn-secondary"
                onClick={onClose}
                aria-label="Close modal"
              >
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
