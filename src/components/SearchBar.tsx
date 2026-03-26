/**
 * SearchBar Component
 * Text input search box for filtering products by title or description
 * Features:
 * - Real-time search as user types
 * - Clear button appears when search term is entered
 * - Disabled state during data loading
 * - Accessible with ARIA labels
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.value - Current search term
 * @param {Function} props.onChange - Callback fired when search term changes
 * @param {string} [props.placeholder='Search products by name or description...'] - Input placeholder text
 * @param {boolean} [props.disabled=false] - Disable input during loading
 * @returns {React.ReactElement} Search bar component
 * 
 * @example
 * const [search, setSearch] = useState('');
 * return <SearchBar value={search} onChange={setSearch} />
 */

import React from 'react';
import '../styles/SearchBar.css';

/**
 * Props for SearchBar component
 */
interface SearchBarProps {
  /** Current search term value */
  value: string;
  /** Callback function when search value changes */
  onChange: (value: string) => void;
  /** Placeholder text for input (optional) */
  placeholder?: string;
  /** Disable input during loading or processing (optional) */
  disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search products by name or description...',
  disabled = false,
}) => {
  /**
   * Clear the search term when clear button is clicked
   */
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        {/* Search icon */}
        <span className="search-icon">🔍</span>
        
        {/* Text input for search */}
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-label="Search products"
        />
        
        {/* Clear button - only visible when there's text entered */}
        {value && (
          <button
            className="search-clear"
            onClick={handleClear}
            aria-label="Clear search"
            disabled={disabled}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
