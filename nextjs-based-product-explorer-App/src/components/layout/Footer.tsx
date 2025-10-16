"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
    const { theme } = useTheme();

    return (
        <footer className={`footer ${theme === "dark" ? "bg-black text-white/70" : "bg-white/70 text-black"}`}>
           © {new Date().getFullYear()} | Product Explorer. All Rights Reserved
        </footer>
    )
}
export default Footer;