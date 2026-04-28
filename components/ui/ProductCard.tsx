import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/item/${product.id || product.objectID}`} className="block">
      <div className="border-2 border-[#FF69B4] bg-white overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={product.imageUrl || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 bg-[#FF69B4] text-white">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
            <span className="font-bold text-lg whitespace-nowrap">${product.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
