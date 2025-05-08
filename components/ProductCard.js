import Link from 'next/link';
import { formatPrice } from '../utils/format';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover-lift">
      {product.image && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-xl">{formatPrice(product.price)}</span>
          <Link href={`/products/${product.id}`}>
            <span className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              Details
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
