"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import { fetchCategories, fetchProductsLimit } from "@/lib/api";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  images: string[];
  discountPercentage: number;
  availabilityStatus: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [catagories, setCatagories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 12;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductsLimit(page, limit, searchQuery, selectedCategory);
      setProducts(data.products);
      setTotal(data.total || data.products.length);
    }
    catch (err: any) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        const formatted = data.map((item: any) => typeof item === "string" ? item : item.slug || item.name);
        setCatagories(formatted);
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, []);


  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCategory, page]);

  const totalPages = Math.ceil(total / limit);
  const logo = <Image
    src={"/product-explorer.webp"}
    alt="App Logo"
    width={50}
    height={50}
  />
  const loding = <Image
    src={"/loading.png"}
    alt="App Logo"
    width={100}
    height={100}
  />

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-4">
        <SearchBar query={searchQuery} onChange={setSearchQuery} />
        <h1 className="main-head img-txt gap-6">
          {logo}Product Explorer{logo}
        </h1>
        <CategoryFilter catagories={catagories} selectedCategory={selectedCategory} onChange={setSelectedCategory} />
      </div>

      {loading && <p className="loading">{loding}<></>Loading...</p>}
      {error && <p className="text-center mt-8">{error}</p>}

      {!loading && !error && (
        < >
          <ProductList products={products} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => {
              if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
            }}
          />
        </>
      )}
    </div>
  )
}
export default Home;