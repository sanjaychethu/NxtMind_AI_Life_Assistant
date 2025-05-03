interface FilterSidebarProps {
  onFilterChange: (filters: {
    genre?: string;
    rating?: number;
    year?: number;
  }) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm"
            onChange={(e) => onFilterChange({ genre: e.target.value })}
          >
            <option value="">All Genres</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="sci-fi">Sci-Fi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Rating
          </label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm"
            onChange={(e) => onFilterChange({ rating: Number(e.target.value) })}
          >
            <option value="">Any Rating</option>
            <option value="7">7+ Stars</option>
            <option value="8">8+ Stars</option>
            <option value="9">9+ Stars</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Release Year
          </label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm"
            onChange={(e) => onFilterChange({ year: Number(e.target.value) })}
          >
            <option value="">Any Year</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
      </div>
    </div>
  )
} 