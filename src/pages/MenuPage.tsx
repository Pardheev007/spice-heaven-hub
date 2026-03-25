import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { menuItems, categories } from "@/data/menuData";
import MenuCard from "@/components/MenuCard";
import Footer from "@/components/Footer";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="pt-16">
      {/* Header */}
      <div className="bg-dark-wood py-16 text-center">
        <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-2">Explore</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream">Our Menu</h1>
        <div className="w-20 h-1 bg-gradient-warm mx-auto mt-4 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Search */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-warm)]"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center font-body text-muted-foreground py-20">No dishes found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item, i) => (
              <div key={item.id} className="opacity-0 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default MenuPage;
