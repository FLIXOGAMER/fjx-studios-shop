import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <p>Keine Produkte gefunden.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
