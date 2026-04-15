const categories = [
  {
    title: "Living & Decor",
    count: "420+ Items",
    alt: "Interior shot of a minimalist living room with warm lighting, natural textures, and a large green plant in a ceramic pot",
    image: "/images/categories/living-decor.jpg",
  },
  {
    title: "Kitchen & Dining",
    count: "285+ Items",
    alt: "Modern kitchen setup with sustainable bamboo utensils, ceramic plates, and fresh organic herbs on a stone countertop",
    image: "/images/categories/kitchen-dining.jpg",
  },
  {
    title: "Self-Care & Wellness",
    count: "150+ Items",
    alt: "Serene wellness space with rolled yoga mats, essential oils, and soft daylight filtering through sheer curtains",
    image: "/images/categories/selfcare-wellness.jpg",
  },
  {
    title: "Garden & Outdoor",
    count: "310+ Items",
    alt: "Lush backyard garden with terraced plants, sustainable gardening tools, and vibrant green foliage in spring light",
    image: "/images/categories/garden-outdoor.jpg",
  },
  {
    title: "Textiles & Bedding",
    count: "195+ Items",
    alt: "Stacked organic linen bedding and cotton towels in neutral tones on an oak bench with soft side lighting",
    image: "/images/categories/textiles-bedding.jpg",
  },
  {
    title: "Natural Apothecary",
    count: "120+ Items",
    alt: "Artisanal glass bottles with droppers, dried botanical herbs, and natural soaps in a rustic apothecary setting",
    image: "/images/categories/natural-apothecary.jpg",
  },
  {
    title: "Ambient Lighting",
    count: "85+ Items",
    alt: "Sculptural pendant light casting warm soft glow against a textured plaster wall in a minimalist room",
    image: "/images/categories/ambient-lighting.jpg",
  },
  {
    title: "Curation & Gifts",
    count: "240+ Items",
    alt: "Beautifully wrapped gifts in recycled brown paper with twine and sprigs of eucalyptus on a wooden table",
    image: "/images/categories/curation-gifts.jpg",
  },
];

export default function CategoriesPage() {
  return (
    <section className="space-y-12 md:space-y-16">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <article
            key={category.title}
            className="group relative h-[400px] cursor-pointer overflow-hidden rounded-xl shadow-[0_10px_22px_rgba(15,23,42,0.08)]"
          >
            <img
              src={category.image}
              alt={category.alt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-colors duration-300 group-hover:from-black/75" />

            <div className="absolute inset-x-0 bottom-0 p-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">{category.title}</h2>
              <p className="mt-1 text-sm text-white/80">{category.count}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
