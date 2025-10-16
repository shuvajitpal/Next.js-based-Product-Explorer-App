"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useTheme } from "@/context/ThemeContext";


interface CategoryFilterProps {
    catagories: string[];
    selectedCategory: string;
    onChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ catagories, selectedCategory, onChange }) => {
    const router = useRouter();

    const handleChange = (category: string) => {
        onChange(category);
        if (category) {
            router.push(`/category?name=${encodeURIComponent(category.toLowerCase())}`);
        } else {
            router.push(`/`);
        }
    };

    const {theme} = useTheme();

    return (
        <div className="mb-4">
            <select value={selectedCategory} onChange={(e) => handleChange(e.target.value)} className={`category-select -mr-8 ${theme === "dark" ? "bg-black/40" : "cat-l"}`}>
                <option value="">All Catagories</option>
                {catagories.map((category, idx) => (
                    <option key={idx} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                ))}
            </select>
        </div>
    )
}
export default CategoryFilter;