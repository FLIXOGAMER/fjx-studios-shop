export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        <button
          className={`category-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => onSelectCategory('all')}
        >
          Alle
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-filter-btn ${selectedCategory === category.id.toString() ? 'active' : ''}`}
            onClick={() => onSelectCategory(category.id.toString())}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
