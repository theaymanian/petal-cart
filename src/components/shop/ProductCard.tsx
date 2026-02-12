import { Link } from 'react-router-dom';
import { Product } from '@/types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        <p className="mt-3 text-lg font-semibold text-primary">${product.price}</p>
      </div>
    </Link>
  );
}
