type CategoryCardProps = {
  icon: string;
  name: string;
};

function CategoryCard({ icon, name }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 flex flex-col items-center justify-center cursor-pointer">

      <div className="text-6xl mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-700">
        {name}
      </h3>

    </div>
  );
}

export default CategoryCard;