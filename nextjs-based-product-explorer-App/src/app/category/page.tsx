'use client';

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import { fetchCategories, fetchProductsByCategory } from "@/lib/api";
import Image from "next/image";


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

const CategoryPageContent = () => {
    const params = useSearchParams();
    const category = params.get("name")?.toLowerCase() || "";
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [catagories, setCatagories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(category);

    useEffect(() => {
        const getCatagories = async () => {
            try {
                const data = await fetchCategories();
                const formatted = data.map((item: any) => typeof item === "string" ? item : item.slug || item.name);
                setCatagories(formatted);
            } catch (err) {
                console.error(err);
            }
        };
        getCatagories();
    }, []);

    useEffect(() => {
        const getProductsByCategory = async () => {
            if (!category) return;
            setLoading(true);
            try {
                const data = await fetchProductsByCategory(category);
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getProductsByCategory();
    }, [category]);

    const loding = <Image
        src={"/loading.png"}
        alt="App Logo"
        width={100}
        height={100}
      />

    if (loading) return <div className="loading">{loding}<></>Loading...</div>;

    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    if (!products || products.length === 0) return <div className="mt-20 text-center flex flex-col items-center gap-4">No Products Found
        <button
            onClick={handleBack}
            className="back-btn"
        >← Go to previous Page
        </button>
    </div>;

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1 -mt-4 gap-4">
                <SearchBar query={searchQuery} onChange={setSearchQuery} />
                <h1 className="cat-hed gap-6">
                    {selectedCategory}
                </h1>
                <CategoryFilter catagories={catagories} selectedCategory={selectedCategory} onChange={setSelectedCategory} />
            </div>
            <ProductList products={products} />
        </div>
    );
};

const CategoryPage = () => {
    return (
        <Suspense fallback={
            <div className="loading">
                <Image
                    src={"/loading.png"}
                    alt="App Logo"
                    width={100}
                    height={100}
                />
                Loading...
            </div>
        }>
            <CategoryPageContent />
        </Suspense>
    );
};


export default CategoryPage;
