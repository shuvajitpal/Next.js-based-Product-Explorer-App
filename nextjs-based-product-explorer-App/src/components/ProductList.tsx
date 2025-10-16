import React from "react";
import ProductItem from "./ProductItem";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  discountPercentage: number;
  availabilityStatus: string;
  thumbnail: string;
  images?: string[];
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({products}) => {
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {products.map((product,index) => (
        <div
      key={product.id}
      className={`fade-in-up ${index % 2 === 0 ? 'animate-fadeInUp' : ''}`}
    >
        <ProductItem key={product.id} {...product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;