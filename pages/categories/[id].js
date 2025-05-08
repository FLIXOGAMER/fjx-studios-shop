import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProductsByCategory, fetchCategoryById } from '../../api/tebex';
import ProductGrid from '../../components/ProductGrid';

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const [categoryData, productsData] = await Promise.all([
          fetchCategoryById(id),
          fetchProductsByCategory(id)
        ]);
        
        setCategory(categoryData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading category data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Kategorie nicht gefunden</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{category.name}</h1>
      {category.description && (
        <p className="text-gray-600 mb-8">{category.description}</p>
      )}
      
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>Keine Produkte in dieser Kategorie gefunden.</p>
      )}
    </div>
  );
}
