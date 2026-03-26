/**
 * AI Service Module
 * Provides simulated AI-powered product description generation
 * Uses template-based text matching to create contextually relevant descriptions,
 * shopping suggestions, and product summaries based on product attributes
 * 
 * @module services/aiService
 * @example
 * import { aiService } from './services/aiService';
 * const result = await aiService.generateDescription(product);
 */

import type { AIDescriptionResponse, Product } from '../types/product';

/**
 * Simulated AI service for generating enhanced product descriptions
 * This is a demonstration of AI integration using intelligent pattern matching
 * and template-based text generation. In production, this would call a real AI API.
 */
export const aiService = {
  /**
   * Generate an enhanced AI description for a product
   * Simulates AI processing by:
   * 1. Extracting product attributes (title, category, rating, price)
   * 2. Selecting category-appropriate templates
   * 3. Generating contextual shopping suggestions
   * 4. Creating a professional product summary
   * 
   * @async
   * @param {Product} product - The product to generate description for
   * @returns {Promise<AIDescriptionResponse>} Enhanced description, suggestions, and summary
   * @example
   * const result = await aiService.generateDescription(myProduct);
   * console.log(result.description); // Enhanced description
   * console.log(result.suggestions); // Array of recommendations
   */
  generateDescription: async (product: Product): Promise<AIDescriptionResponse> => {
    // Simulate API delay to mimic real AI service latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Extract key information from the product
    const title = product.title;
    const price = product.price;
    const category = product.category;
    const originalDescription = product.description;
    const rating = product.rating?.rate || 0;

    // Generate enhanced description based on product details
    const enhancedDescription = generateEnhancedDescription(
      title,
      category,
      originalDescription,
      price,
      rating
    );

    // Generate shopping suggestions based on product attributes
    const suggestions = generateSuggestions(category, price, rating);

    // Generate a professional summary
    const summary = generateSummary(title, price, rating, category);

    return {
      description: enhancedDescription,
      suggestions,
      summary,
    };
  },
};

/**
 * Generate an enhanced, more compelling product description
 * Uses category-specific templates to create marketing-friendly descriptions
 * Templates are selected based on product category and rating
 * 
 * @param {string} title - Product title
 * @param {string} category - Product category (electronics, jewelery, etc.)
 * @param {string} originalDescription - Original product description
 * @param {number} _price - Product price (reserved for future enhancement)
 * @param {number} rating - Product rating (0-5)
 * @returns {string} Enhanced product description
 * @private
 */
function generateEnhancedDescription(
  title: string,
  category: string,
  originalDescription: string,
  _price: number,
  rating: number
): string {
  // Category-specific description templates for different product types
  const templates: { [key: string]: string[] } = {
    electronics: [
      `Premium ${title}. ${originalDescription} This state-of-the-art device combines cutting-edge technology with exceptional build quality.`,
      `Introducing the ${title} - a revolutionary product designed for tech enthusiasts. ${originalDescription} Experience unparalleled performance and reliability.`,
    ],
    jewelery: [
      `Exquisite ${title}. ${originalDescription} Crafted with meticulous attention to detail, this piece is perfect for any occasion.`,
      `Elegant ${title} featuring sophisticated design. ${originalDescription} A timeless accessory that elevates your personal style.`,
    ],
    "men's clothing": [
      `Stylish ${title}. ${originalDescription} Perfect for the modern man seeking comfort and contemporary fashion.`,
      `The ${title} combines comfort and style. ${originalDescription} Ideal for both casual and professional settings.`,
    ],
    "women's clothing": [
      `Beautiful ${title}. ${originalDescription} Designed with elegance in mind, this piece showcases modern fashion sensibility.`,
      `Stunning ${title} for the fashion-conscious woman. ${originalDescription} Perfect for any wardrobe.`,
    ],
  };

  // Get category-specific templates or fall back to generic template
  const categoryTemplates = templates[category.toLowerCase()] || [
    `High-quality ${title}. ${originalDescription} A reliable choice backed by strong customer ratings.`,
  ];

  // Select template based on product rating (higher rated = first template)
  const selectedTemplate = rating > 4.2 ? categoryTemplates[0] : categoryTemplates[1] || categoryTemplates[0];

  return selectedTemplate;
}

/**
 * Generate personalized shopping suggestions based on product characteristics
 * Considers rating, price point, and category to provide relevant recommendations
 * 
 * @param {string} category - Product category
 * @param {number} price - Product price in USD
 * @param {number} rating - Product rating (0-5)
 * @returns {string[]} Array of shopping suggestions with emojis
 * @private
 */
function generateSuggestions(category: string, price: number, rating: number): string[] {
  const suggestions: string[] = [];

  // Suggestion 1: Rating-based recommendation
  if (rating > 4.5) {
    suggestions.push('⭐ Best seller with excellent customer reviews - highly recommended purchase');
  } else if (rating > 4.0) {
    suggestions.push('✓ Well-reviewed product with consistent quality');
  } else {
    suggestions.push('✓ Solid product choice with good value');
  }

  // Suggestion 2: Price tier recommendation
  if (price < 50) {
    suggestions.push('💰 Excellent value for money - budget-friendly option');
  } else if (price < 150) {
    suggestions.push('📊 Mid-range product offering quality at a competitive price');
  } else {
    suggestions.push('💎 Premium product for those seeking top-tier quality');
  }

  // Suggestion 3: Category-specific tips and recommendations
  const categoryTips: { [key: string]: string } = {
    electronics: '⚡ Perfect for tech enthusiasts - check compatibility before ordering',
    jewelery: '✨ Great gift option - comes well-packaged for special occasions',
    "men's clothing": '👔 Classic style that pairs well with many outfits',
    "women's clothing": '👗 Versatile piece that works for multiple seasons',
  };

  const tip = categoryTips[category.toLowerCase()];
  if (tip) {
    suggestions.push(tip);
  }

  // Suggestion 4: General purchase recommendation
  suggestions.push('🎯 Consider buying in bulk or looking for bundle deals');

  return suggestions;
}

/**
 * Generate a professional product summary
 * Creates a concise overview combining rating, price, and category information
 * 
 * @param {string} title - Product title
 * @param {number} price - Product price in USD
 * @param {number} rating - Product rating (0-5)
 * @param {string} category - Product category
 * @returns {string} Professional product summary
 * @private
 */
function generateSummary(title: string, price: number, rating: number, category: string): string {
  // Determine rating description based on actual rating score
  const ratingText =
    rating > 4.5 ? 'Highly rated' : rating > 4.0 ? 'Well-reviewed' : 'Popular';
  
  // Determine price tier description based on absolute price value
  const priceText =
    price < 50 ? 'affordable' : price < 150 ? 'moderately priced' : 'premium-priced';

  return `${ratingText} ${priceText} ${category} product: ${title}. With a rating of ${rating}/5, this item offers excellent quality and value. Ideal for customers looking for reliable, high-quality products in the ${category} category.`;
}

