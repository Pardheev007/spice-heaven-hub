import { Link } from "react-router-dom";
import { menuItems } from "@/data/menuData";
import MenuCard from "./MenuCard";

const FeaturedSection = () => {
  const featured = menuItems.filter((i) => i.rating >= 4.8).slice(0, 4);

  return (
    <section className="py-20 bg-background">
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

        <div className="text-center mt-12">
          <Link
            to="/menu"
            className="inline-block border-2 border-primary text-primary font-body font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
