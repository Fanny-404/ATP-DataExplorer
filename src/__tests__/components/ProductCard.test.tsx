import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from '../../components/ProductCard';
import type { Product } from '../../types/product';

describe('ProductCard Component', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'This is a test product',
    category: 'electronics',
    image: 'https://example.com/product.png',
    rating: {
      rate: 4.5,
      count: 100,
    },
  };

  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render product information', () => {
    render(
      <ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
  });

  it('should display rating when available', () => {
    render(
      <ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />
    );

    expect(screen.getByText(/⭐ 4.5/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });

  it('should call onViewDetails when View Details button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />
    );

    const viewButton = screen.getByRole('button', { name: /view details/i });
    await user.click(viewButton);

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockProduct);
  });

  it('should display Top Rated badge for high rated products', () => {
    render(
      <ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />
    );

    expect(screen.getByText('⭐ Top Rated')).toBeInTheDocument();
  });

  it('should render product description', () => {
    render(
      <ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />
    );

    expect(screen.getByText('This is a test product')).toBeInTheDocument();
  });
});
