import CategoryCard from "./CategoryCard";
import { categories } from "../../data/categories";

function Categories() {
  return (
    <section className="px-16 py-20 bg-white">

      <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
        Shop by Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            icon={category.icon}
            name={category.name}
          />
        ))}

      </div>

    </section>
  );
}

export default Categories;