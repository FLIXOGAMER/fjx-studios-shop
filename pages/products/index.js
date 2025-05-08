import { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories } from '../../api/tebex';
import ProductGrid from '../../components/ProductGrid';
import CategoryFilter from '../../components/CategoryFilter';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await fetchProducts();
        const categoriesData = await fetchCategories();
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.category && product.category.id.toString() === selectedCategory
      );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Alle Produkte</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <ProductGrid products={filteredProducts} />
        </>
      )}
    </div>
  );
}
