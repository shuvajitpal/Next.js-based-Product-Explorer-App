"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "@/components/ProductItem";
import Head from "next/head";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

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

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const { theme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const removeFavourite = (id: number) => {
        const updatedFavorites = favorites.filter((product) => product.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    const handleBack = () => {
        router.back();
    };


    if (favorites.length === 0) {
        return (
            <div className={`flex flex-col items-center justify-center mt-20 text-lg font-medium gap-4 ${theme === "dark" ? "text-white" : "text-black"}`}>No Favourites Products Here.
            <button onClick={handleBack} className="back-btn">← Go to previous Page
            </button>
            </div>
        )
    }

    return (
        <div className={`p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${theme === "dark" ? " text-white" : " text-black"}`}>
            <Head>
                <title>Favorite Page</title>
            </Head>
            {favorites.map((product) => (
                <div key={product.id} className="relative">
                    <ProductItem
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        rating={product.rating}
                        thumbnail={product.thumbnail}
                        images={product.images}
                        showFavoriteButton={true}
                        onRemoveFavorite={removeFavourite}
                        availabilityStatus={product.availabilityStatus}
                        discountPercentage={product.discountPercentage}
                    />
                </div>
            ))}
        </div>
    );
}
export default FavoritesPage;