"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "@/components/ProductItem";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  images?: string[];
  discountPercentage: number;
  availabilityStatus: string;
}

const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const onRemoveFromCart = (id: number) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  const handleBack = () => {
    router.back();
  };

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const shortenTitle = (title: string, maxLength: number = 25) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center mt-20 text-lg font-medium gap-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
        No Products in Cart.
        <button onClick={handleBack} className="back-btn">← Go to previous Page</button>
      </div>
    )
  }

  const text = `${theme === "dark" ? "text-white" : "text-black"}`;

  return (
    <div className={`flex flex-col lg:flex-row gap-6 p-4 mt-5 min-h-screen`}>
      <div className="lg:w-2/3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((product) => (
            <div key={product.id} className="relative">
              <ProductItem
                id={product.id}
                title={product.title}
                price={product.price}
                rating={product.rating}
                thumbnail={product.thumbnail}
                images={product.images}
                showAddCartButton={true}
                onRemoveFromCart={onRemoveFromCart}
                availabilityStatus={product.availabilityStatus}
                discountPercentage={product.discountPercentage}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={`lg:w-1/3 ${text} `}>
        <div className={`sticky top-20 ${theme === "dark" ? "bg-gray-800" : "bg-white/30"} rounded-lg shadow-lg border ${theme === "dark" ? "border-gray-700" : "border-gray-200"} p-6`}>
          <h2 className="text-xl font-bold mb-2">Price Details</h2>
          <div className="max-h-64 overflow-y-auto ">
            {cart.map((product) => (
              <div key={product.id} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm flex-1 pr-2 truncate">
                  {shortenTitle(product.title)}
                </span>
                <span className="text-sm font-medium whitespace-nowrap mr-1 min-w-[55px] text-right">
                  ${formatPrice(product.price)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 dark:border-gray-600 pt-1">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Price:</span>
              <span className="text-lg font-bold ">${formatPrice(totalPrice)}</span>
            </div>
          </div>
          <div className="sticky bottom-0 pt-4 ">
            <button
              onClick={() => console.log("Proceeding to checkout...")}
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
            >Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;