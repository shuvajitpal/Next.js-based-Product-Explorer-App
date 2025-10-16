"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const {theme} = useTheme();

    return (
        <div className="pagination-wrapper max-w-full flex flex-wrap justify-center items-center gap-1 sm:gap-0.5 min-h-[40px]">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
                className="pagination-btn  ">Prev</button>
            {pages.map(page => (
                <button key={page} onClick={() => onPageChange(page)}
                    className={`pagination-key ${page === currentPage ? 'border-black bg-blue-500 text-white' : ''} ${theme === "dark" ? "" : "border-white text-white"}`}>
                    {page}
                </button>
            ))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
                className="pagination-btn ">Next</button>
        </div>
    )
}
export default Pagination;