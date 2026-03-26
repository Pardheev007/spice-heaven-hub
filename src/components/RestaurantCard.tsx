import { Link } from "react-router-dom";
import { Star, Clock, MapPin } from "lucide-react";
import type { Restaurant } from "@/data/restaurants";
import { getRestaurantImage } from "@/data/restaurants";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const image = getRestaurantImage(restaurant);

  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="group bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={image}
          alt={restaurant.name}
          loading="lazy"
          width={640}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-display text-xl font-bold text-primary-foreground drop-shadow-lg">
            {restaurant.name}
          </h3>
          <p className="font-body text-xs text-primary-foreground/80">{restaurant.tagline}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gold" fill="hsl(45 90% 55%)" />
            <span className="font-body text-sm font-semibold text-foreground">{restaurant.rating}</span>
            <span className="font-body text-xs text-muted-foreground">({restaurant.reviews})</span>
          </div>
          <span className="font-body text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
            {restaurant.cuisine}
          </span>
        </div>

        <div className="flex items-center gap-4 font-body text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {restaurant.deliveryTime}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {restaurant.distance}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
