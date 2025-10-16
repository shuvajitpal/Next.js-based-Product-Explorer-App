export const fetchProducts = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.products;
  } catch (err) {
    throw err;
  }
};

export const searchProducts = async (query: string) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    if (!res.ok) throw new Error("Failed to search products");
    const data = await res.json();
    return data.products;
  } catch (err) {
    throw err;
  }
};

export const fetchCategories = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchProductsByCategory = async (category: string) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);
    if (!res.ok) throw new Error("Failed to fetch products by category");
    const data = await res.json();
    return data.products;
  } catch (err) {
    throw err;
  }
};

export const fetchProductsLimit = async (
  page: number = 1,
  limit: number = 10,
  searchQuery?: string,
  selectedCategory?: string
) => {
  try {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`;

    if (searchQuery) {
      url = `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${(page - 1) * limit}`;
    } else if (selectedCategory) {
      url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${(page - 1) * limit}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};