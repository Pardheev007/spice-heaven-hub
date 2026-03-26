import { Link } from "react-router-dom";
import { restaurants, getRestaurantImage } from "@/data/restaurants";
import RestaurantCard from "./RestaurantCard";
import { menuItems } from "@/data/menuData";
import MenuCard from "./MenuCard";

const FeaturedSection = () => {
  const topRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const featured = menuItems.filter((i) => i.rating >= 4.8).slice(0, 4);

  return (
    <>
      {/* Popular Restaurants */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-2">Top Picks</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Popular Restaurants
            </h2>
            <div className="w-20 h-1 bg-gradient-warm mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRestaurants.map((r, i) => (
              <div key={r.id} className="opacity-0 animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <RestaurantCard restaurant={r} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/restaurants"
              className="inline-block border-2 border-primary text-primary font-body font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              View All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* Most Loved Dishes */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-2">Our Specialties</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Most Loved Dishes
            </h2>
            <div className="w-20 h-1 bg-gradient-warm mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((item, i) => (
              <div key={item.id} className="opacity-0 animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedSection;
