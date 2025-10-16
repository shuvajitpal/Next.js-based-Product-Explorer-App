"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useCartAndFavorites } from "@/hooks/useCartAndFavorites";

interface ProductItemProps {
    id: number;
    title: string;
    price: number;
    rating: number;
    discountPercentage: number;
    availabilityStatus: string;
    thumbnail: string;
    images?: string[];
    showFavoriteButton?: boolean;
    showAddCartButton?: boolean;
    onRemoveFavorite?: (id: number) => void;
    onRemoveFromCart?: (id: number) => void;

}

const ProductItem: React.FC<ProductItemProps> = ({ id, title, price, rating, thumbnail, images = [], showFavoriteButton = true, onRemoveFavorite, showAddCartButton = true, onRemoveFromCart, availabilityStatus, discountPercentage }) => {
    
    const { isCart, isFavorite, toggleCart, toggleFavorite } = useCartAndFavorites({
        product: {
            id, title,
            price,
            rating,
            discountPercentage,
            availabilityStatus,
            thumbnail,
            images,
        },
        onRemoveFromCart,
        onRemoveFavorite,
    });

    const { theme } = useTheme();

    return (
        <div className={`product-item ${theme === "dark" ? "navbar-dark" : "navbar-light"}`}>
            <p className="discount">{discountPercentage}% Off</p>
            <Link href={`/${id}`}>
                <img src={thumbnail} alt={title} className="w-full h-48 object-cover mb-1 mt-2 rounded" />
                <h2 className="title">{title}</h2>
            </Link>

            <p className={`transition-all duration-200 -mt-2 mb-0.5 ${theme === "dark" ? "text-white" : "text-black"}`}>Price: ${price}</p>
            <p className={`text-yellow-200 text-[12px] ${theme === "dark" ? "" : "rating-text"}`}> Rating:⭐{rating}</p>
            <p className={`mt-1 ${availabilityStatus === "In Stock" ? "text-green-600" :
                availabilityStatus === "Low Stock" ? "text-yellow-500" : "text-red-500"
                }`}>{availabilityStatus}</p>

            {showFavoriteButton !== false && (
                <button
                    onClick={toggleFavorite}
                    className={`favorite-btn ${isFavorite ? '' : ''}`}
                >
                    <Image
                        src={isFavorite ? "/solid-heart.png" : theme === "dark"
                            ? "/line-heart-white.png"
                            : "/line-heart.png"}
                        alt={isFavorite ? "Remove Favorite" : "Add Favorite"}
                        width={24}
                        height={24}
                    />
                </button>
            )}

            {showAddCartButton !== false && (
                <button
                    onClick={toggleCart}
                    className={`cart-btn mb-2 ${isCart ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} ${theme === "dark" ? "shadow-white/90" : "shadow-black/90"}`}
                >{isCart ? (
                    <><span>Remove</span>
                        <span>From Cart</span></>
                ) : (
                    <><span>🛒Add</span>
                        <span>To Cart</span></>
                )}
                </button>
            )}
        </div>
    );
}

export default ProductItem;