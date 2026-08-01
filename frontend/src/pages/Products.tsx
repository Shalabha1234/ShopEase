import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import { getProducts } from "../api/ProductApi";

type Product = {
  id: number;
  name: string;
  description: string;
  brand: string;
  category_id: number;
  price: number;
  old_price: number;
  stock: number;
  image: string;
  rating: number;
  reviews: number;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="px-10 py-10">
      <h1 className="text-4xl font-bold mb-8">
        All Products
      </h1>

      <input
        type="text"
        placeholder="Search products..."
        className="w-full md:w-96 border rounded-lg px-4 py-3 mb-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={`/images/products/${product.image}`}
            name={product.name}
            category={`Category ${product.category_id}`}
            brand={product.brand}
            description={product.description}
            stock={product.stock}
            price={product.price}
            oldPrice={product.old_price}
            rating={product.rating}
            reviews={product.reviews}
          />
        ))}
      </div>
    </section>
  );
}

export default Products;