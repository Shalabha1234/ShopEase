import ProductCard from "../productCard";
import { products } from "../../data/products";

function FeaturedProducts() {
  return (
    <section className="px-6 md:px-10 lg:px-16 py-20 bg-slate-50">

      <h2 className="text-4xl font-bold text-gray-800 mb-10">
         Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            category={product.category}
            brand={product.brand}
            description={product.description}
            stock={product.stock}
            price={product.price}
            oldPrice={product.oldPrice}
            rating={product.rating}
            reviews={product.reviews}
          />
        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;