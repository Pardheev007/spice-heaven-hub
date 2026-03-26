import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import RestaurantCard from "@/components/RestaurantCard";
import Footer from "@/components/Footer";

const cuisines = ["All", "North Indian", "South Indian", "Hyderabadi", "Punjabi", "Coastal Indian"];

const RestaurantsPage = () => {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [sortBy, setSortBy] = useState<"rating" | "time">("rating");

  const filtered = useMemo(() => {
    let list = restaurants.filter(
      (r) =>
        (cuisine === "All" || r.cuisine === cuisine) &&
        (r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.tagline.toLowerCase().includes(search.toLowerCase()))
    );
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, cuisine, sortBy]);

  return (
    <main className="pt-16">
      <div className="bg-dark-wood py-12 text-center">
        <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-2">Spice Heaven+</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-cream">
          Restaurants Near You
        </h1>
        <div className="w-20 h-1 bg-gradient-warm mx-auto mt-4 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-card font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <button
            onClick={() => setSortBy(sortBy === "rating" ? "time" : "rating")}
            className="flex items-center gap-2 px-4 py-3 rounded-full border border-border bg-card font-body text-sm text-foreground hover:bg-muted transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Sort: {sortBy === "rating" ? "Top Rated" : "Fastest"}
          </button>
        </div>

        {/* Cuisine chips */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {cuisines.map((c) => (
            <button
              key={c}
              onClick={() => setCuisine(c)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 ${
                cuisine === c
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-warm)]"
                  : "bg-card text-foreground border border-border hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Restaurant grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r, i) => (
            <div key={r.id} className="opacity-0 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <RestaurantCard restaurant={r} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-body text-muted-foreground py-20">No restaurants found.</p>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default RestaurantsPage;
