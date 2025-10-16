'use client';

import Link from "next/link";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const home = <Image
        src={"/home.png"}
        alt="App Logo"
        width={20}
        height={20}
    />
    const favourites = <Image
        src={"/solid-heart.png"}
        alt="App Logo"
        width={20}
        height={20}
    />
    const cart = <Image
        src={"/cart.png"}
        alt="App Logo"
        width={20}
        height={20}
    />

    return (
        <nav className={`navbar navbar-shadow ${theme === "dark" ? "navbar-dark" : "navbar-light"}`}>
            <div className="flex items-center gap-5">
                <Link href="/" className="nav-link img-txt gap-1">{home}Home</Link>
                <Link href="/favourites" className="nav-link img-txt gap-1">{favourites}Favourites</Link>
                <Link href="/cart" className="nav-link img-txt gap-1">{cart}Cart</Link>
            </div>
            <button onClick={toggleTheme} className="theme-toggle-btn"
            >{theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
        </nav>
    );
}

export default Navbar;