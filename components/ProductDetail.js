import Link from 'next/link';
import { formatPrice } from '../utils/format';

export default function ProductDetail({ product }) {
  const handleCheckout = () => {
    window.location.href = `https://checkout.tebex.io/package/${product.id}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {product.image ? (
            <div className="md:flex-shrink-0 md:w-1/3">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}
          
          <div className="p-8 md:p-12 w-full">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              <div className="text-2xl md:text-3xl font-bold text-indigo-600">
                {formatPrice(product.price)}
              </div>
            </div>
            
            {product.category && (
              <Link href={`/categories/${product.category.id}`}>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mb-6">
                  {product.category.name}
                </span>
              </Link>
            )}
            
            <div className="prose mb-8">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            
            <button
              onClick={handleCheckout}
              className="btn-primary w-full md:w-auto"
            >
              Jetzt kaufen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
