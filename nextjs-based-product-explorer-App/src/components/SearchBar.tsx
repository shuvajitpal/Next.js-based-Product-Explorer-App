"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface SearchBarProps {
    query: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange }) => {
    const { theme } = useTheme();


    return (
        <div className="relative h-[50px] flex items-center -mt-4 -ml-8">
            <input type="text" value={query} onChange={(e) => onChange(e.target.value)}
                placeholder="Search products..."
                className={`search-bar ${theme === "dark" ? "bg-black/50 text-white" : "search-bar-l"}`} />
        </div>
    )
};
export default SearchBar;