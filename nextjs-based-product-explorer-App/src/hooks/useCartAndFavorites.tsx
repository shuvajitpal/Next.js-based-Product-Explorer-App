"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  title?: string;
  price?: number;
  rating?: number;
  discountPercentage?: number;
  availabilityStatus?: string;
  thumbnail?: string;
  images?: string[];
}

interface UseCartAndFavoritesProps {
  product: Product;
  onRemoveFromCart?: (id: number) => void;
  onRemoveFavorite?: (id: number) => void;
}

export function useCartAndFavorites({
  product,
  onRemoveFromCart,
  onRemoveFavorite,
}: UseCartAndFavoritesProps) {
  const [isCart, setIsCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedFavorites = localStorage.getItem("favorites");

    if (storedCart) {
      try {
        const cart = JSON.parse(storedCart) as any[];
        setIsCart(cart.some((item: any) => item.id === product.id));
      } catch {
        setIsCart(false);
      }
    } else {
      setIsCart(false);
    }

    if (storedFavorites) {
      try {
        const favorites = JSON.parse(storedFavorites) as any[];
        setIsFavorite(favorites.some((item: any) => item.id === product.id));
      } catch {
        setIsFavorite(false);
      }
    } else {
      setIsFavorite(false);
    }
  }, [product.id]);

  const toggleCart = () => {
    const storedCart = localStorage.getItem("cart");
    let cart: any[] = [];
    try {
      cart = storedCart ? JSON.parse(storedCart) : [];
    } catch {
      cart = [];
    }

    if (isCart) {
      cart = cart.filter((item: any) => item.id !== product.id);
      onRemoveFromCart?.(product.id);
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setIsCart(!isCart);
  };

  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites: any[] = [];
    try {
      favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch {
      favorites = [];
    }

    if (isFavorite) {
      favorites = favorites.filter((item: any) => item.id !== product.id);
      onRemoveFavorite?.(product.id);
    } else {
      favorites.push({
        id: product.id,
        title: product.title,
        price: product.price,
        rating: product.rating,
        discountPercentage: product.discountPercentage,
        availabilityStatus: product.availabilityStatus,
        thumbnail: product.thumbnail,
        images: product.images,
      });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return { isCart, isFavorite, toggleCart, toggleFavorite };
};