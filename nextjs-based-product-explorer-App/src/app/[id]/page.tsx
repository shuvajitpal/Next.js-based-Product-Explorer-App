'use client';

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useCartAndFavorites } from "@/hooks/useCartAndFavorites";

interface Review {
    reviewerName: string;
    comment: string;
    rating: number;
    date: string;
}

interface Product {
    id: number;
    title: string;
    price: number;
    rating: number;
    description: string;
    thumbnail: string;
    images?: string[];
    brand?: string;
    category?: string;
    discountPercentage: number;
    availabilityStatus: string;
    stock: number;
    shippingInformation: string;
    returnPolicy: string;
    tags: string[];
    reviews: Review[];
}

const ProductDetailsPage = () => {
    const params = useParams();
    const productId = params.id;
    const router = useRouter();
    const { theme } = useTheme();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [displayedImage, setDisplayedImage] = useState<string>();
    const [isChanging, setIsChanging] = useState(false);

    const handleThumbnailClick = (img: string) => {
        if (img !== displayedImage) {
            setIsChanging(true);
            setImageLoaded(false)
            setTimeout(() => {
                setDisplayedImage(img);
                setIsChanging(false);
            }, 250);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [productId]);

    const { isCart, isFavorite, toggleCart, toggleFavorite } = useCartAndFavorites({
        product: product || { id: 0 },
        onRemoveFromCart: (id) => {
            console.log(`removed ${id} from cart`)
        },
        onRemoveFavorite: (id) => {
            console.log(`remove ${id} from favourite`)
        }
    })

    const getRatingColor = (rating: number) => {
        if (rating >= 4) return "bg-green-600";
        else if (rating >= 3) return "bg-lime-600";
        else if (rating >= 2) return "bg-yellow-500";
        else if (rating >= 1) return "bg-orange-500";
        else return "bg-red-500";
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://dummyjson.com/products/${productId}`);
                const data = await res.json();
                setProduct(data);
                const initialImage = data.images && data.images.length > 1 ? data.images[0] : data.thumbnail;
                setDisplayedImage(initialImage);
                setImageLoaded(false);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const loding = <Image
        src={"/loading.png"}
        alt="App Logo"
        width={100}
        height={100}
    />

    if (loading) return <div className="loading">{loding}<></>Loading...</div>;
    if (!product) return <div className="mt-20 text-center">Product not found</div>;

    const handleBack = () => {
        router.back();
    };

    const text = `${theme === "dark" ? "text-white" : "text-black"}`;


    return (
        <div className="flex items-start justify-between p-6 max-w-4xl mx-auto gap-5">
            <button
                onClick={handleBack}
                className={`back-btn -ml-20 ${theme === "dark" ? "back-btn-d" : "back-btn-l"} `}
            >← Back
            </button>
            <div className={`p-6  mx-auto ${theme === "dark" ? "bg-black/30" : "bg-white/50"} rounded-lg shadow-lg ${text}`}>
                <p className={`-mt-2 text-center`}><strong>Category:</strong> {product.category}</p>
                <h1 className={`text-2xl text-center font-bold `}>{product.title}</h1>
                <div
                    className={`flex items-center gap-1 px-2 py-0.5 mb-2 rounded text-white font-semibold text-sm w-fit mx-auto ${getRatingColor(
                        product.rating
                    )}`}
                >
                    {product.rating.toFixed(1)} ★
                </div>
                <div className="flex items-center justify-center">
                    <div className="relative min-h-[250px] h-[250px] aspect-square border rounded-lg bg-white/20 dark:bg-black/20">
                        {!imageLoaded && (
                            <p className="ml-15 absolute text-lg font-semibold text-gray-500 mt-25">Loading image...</p>
                        )}
                        <img key={displayedImage} src={displayedImage} alt={product.title}
                            className={`w-full h-full object-contain rounded ${isChanging ? "slide-fade-exit-active" : imageLoaded ? "slide-fade-enter-active" : "smooth-fade-enter"
                                }`}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageLoaded(false)}
                        />
                    </div>
                </div>
                {product.images && product.images.length > 0 && (
                    <div className="flex justify-center space-x-2 overflow-x-auto py-2">
                        {product.images.slice(0).map((img, idx) => (
                            <img key={idx} src={img} alt={`${product.title} ${idx + 1}`}
                                className={`thumbnail ${displayedImage === img ? "border-blue-500" : theme === "dark" ? "border-gray-800" : "border-white/70"}`}
                                onClick={() => handleThumbnailClick(img)}
                            />
                        ))}
                    </div>
                )}
                <div className="flex justify-center items-center gap-3 mb-4">
                    <button
                        onClick={() => console.log("Buy Now clicked")}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition ml-5"
                    >Buy Now
                    </button>
                    <button
                        onClick={toggleCart}
                        className={`ml-2 ${isCart ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg shadow-md transition`}>{isCart ? 'Remove from Cart' : '🛒 Add to Cart'}
                    </button>
                    <button onClick={toggleFavorite}
                        className={`ml-2 px-2 py-2 ${isFavorite ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-600 hover:bg-gray-700'} text-white rounded-lg shadow-md transition`}
                    >{isFavorite ? '❤️ Remove from Favorites' : '♥ Add to Favorites'}
                    </button>
                </div>
                <p className={`mt-4 mb-1`}><strong>Brand:</strong> {product.brand}</p>
                <div className="flex items-center mb-1 gap-3">
                    <p className={`text-xl font-semibold`}>
                        Price: ${product.price.toFixed(2)}
                    </p>
                    <span className="bg-red-600 text-white px-2 py-1 text-sm rounded-md flex items-center justify-center">
                        {product.discountPercentage}% OFF
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <p className={`font-semibold mb-1 ${product.availabilityStatus === "In Stock"
                        ? "text-green-500"
                        : product.availabilityStatus === "Low Stock"
                            ? "text-yellow-400"
                            : "text-red-500"
                        }`}
                    >
                        {product.availabilityStatus}
                    </p>
                    <p className="text-base">"
                        {product.stock > 10 ? (
                            <span className="italic">
                                {product.stock} items available
                            </span >
                        ) : product.stock > 2 ? (
                            <span>
                                <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} italic`}>Only few more left </span>
                                <span className="text-base text-current font-medium">({product.stock} left)</span>
                            </span>
                        ) : (
                            <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                Only {product.stock} left
                            </span>
                        )}"
                    </p>
                </div>
                <p className="mb-1"><strong>Shipping:</strong> {product.shippingInformation}.</p>
                <p className="mb-1"><strong>Return Policy:</strong> {product.returnPolicy || "No return policy"}.
                </p>
                <p><strong>Tags:</strong> {product.tags.join(", ")}</p>
                <p
                    className={`p-4 border rounded-lg mt-4 ${theme === "dark" ? "border-black" : "border-white"
                        }`}
                >
                    <strong>Product Description:</strong><br />• {product.description}
                </p>
                {product.reviews && product.reviews.length > 0 && (
                    <div
                        className={`mt-4 p-4 border rounded-lg ${theme === "dark"
                            ? "border-gray-700 bg-black/20"
                            : "border-gray-300 bg-white/30"
                            }`}
                    >
                        <h3 className="text-lg font-bold mb-1">User Reviews</h3>
                        {product.reviews.map((rev, idx) => (
                            <div
                                key={idx}





                                className={`p-3 mb-3 border-l-4 rounded ${theme === "dark"
                                    ? "border-blue-500 bg-black/30"
                                    : "border-blue-500 bg-white/50"
                                    }`}
                            >
                                <div className="font-semibold">
                                    {rev.reviewerName}
                                    <div
                                        className={`inline-flex ml-1 items-center gap-1 px-1.5 py-0.1 rounded text-white font-semibold text-sm w-fit ${getRatingColor(
                                            rev.rating
                                        )}`}
                                    >
                                        {rev.rating.toFixed(1)} ★
                                    </div>

                                    <span className={`ml-2 text-sm ${text} `}>
                                        ({new Date(rev.date).toLocaleDateString("en-IN")})
                                    </span>
                                </div>
                                <p className="mt-1 italic ">
                                    “{rev.comment}”
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default ProductDetailsPage;