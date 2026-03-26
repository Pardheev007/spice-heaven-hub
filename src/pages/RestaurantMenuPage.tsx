import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { ArrowLeft, Star, Clock, MapPin, Search } from "lucide-react";
import { restaurants, getRestaurantMenu, getRestaurantImage } from "@/data/restaurants";
import { categories } from "@/data/menuData";
import MenuCard from "@/components/MenuCard";
import Footer from "@/components/Footer";

const RestaurantMenuPage = () => {
  const { id } = useParams<{ id: string }>();
  const restaurant = restaurants.find((r) => r.id === id);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const menu = useMemo(() => {
    if (!restaurant) return [];
    let items = getRestaurantMenu(restaurant);
    if (activeCategory !== "All") items = items.filter((i) => i.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    return items;
  }, [restaurant, activeCategory, search]);

  if (!restaurant) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Restaurant not found</h2>
          <Link to="/restaurants" className="text-primary font-body hover:underline">
            ← Back to restaurants
          </Link>
        </div>
      </main>
    );
  }

  const image = getRestaurantImage(restaurant);
  const availableCategories = ["All", ...new Set(getRestaurantMenu(restaurant).map((i) => i.category))];

  return (
    <main className="pt-16">
      {/* Restaurant header */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={image} alt={restaurant.name} className="w-full h-full object-cover" width={1920} height={400} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-wood/90 via-dark-wood/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-1.5 font-body text-sm text-cream/80 hover:text-primary mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Restaurants
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-cream">{restaurant.name}</h1>
            <p className="font-body text-sm text-cream/70 mt-1">{restaurant.tagline}</p>
            <div className="flex items-center gap-4 mt-3 font-body text-sm text-cream/80">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gold" fill="hsl(45 90% 55%)" />
                {restaurant.rating} ({restaurant.reviews})
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {restaurant.deliveryTime}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {restaurant.distance}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search this menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-card font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {availableCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 ${
                activeCategory === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground border border-border hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menu.map((item, i) => (
            <div key={item.id} className="opacity-0 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <MenuCard item={item} />
            </div>
          ))}
        </div>

        {menu.length === 0 && (
          <p className="text-center font-body text-muted-foreground py-20">No items found.</p>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default RestaurantMenuPage;
