import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import CategorySlider from '../components/CategorySlider';
import FeaturedProducts from '../components/FeaturedProducts';
import DiscordWidget from '../components/DiscordWidget';
import ProductCard from '../components/ProductCard';
import { fetchCategories, fetchProducts } from '../api/tebex';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await fetchCategories();
        const productsData = await fetchProducts();
        
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <CategorySlider categories={categories} />
          <FeaturedProducts products={products.filter(product => product.featured)} />
          <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Unsere beliebtesten Produkte</h2>
              <p className="text-gray-600">
                Entdecke unsere meistverkauften Produkte und Tools, die von Entwicklern auf der ganzen Welt genutzt werden.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {products.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Tritt unserer Community bei</h2>
              <DiscordWidget />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
