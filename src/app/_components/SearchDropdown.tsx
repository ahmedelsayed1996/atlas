interface SearchDropdownProps<T> {
  label: string;
  placeholder: string;
  isOpen: boolean;
  searchValue: string;
  items: T[];
  selectedItem: T | null;
  onToggle: () => void;
  onSearch: (value: string) => void;
  onSelect: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
}

const SearchDropdown = <T extends { id: number }>({
  label,
  placeholder,
  isOpen,
  searchValue,
  items,
  selectedItem,
  onToggle,
  onSearch,
  onSelect,
  renderItem,
}: SearchDropdownProps<T>) => {
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 bg-white border rounded-lg"
      >
        <span className="text-sm">
          {selectedItem ? renderItem(selectedItem) : label}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border-b outline-none"
          />

          <ul className="max-h-60 overflow-auto">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => onSelect(item)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {renderItem(item)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
