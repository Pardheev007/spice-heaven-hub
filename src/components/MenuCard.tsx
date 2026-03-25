import { Star, Flame, Plus } from "lucide-react";
import type { MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={640}
          height={640}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.isVeg ? "bg-green-600 text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
            {item.isVeg ? "VEG" : "NON-VEG"}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-0.5">
          {Array.from({ length: item.spiceLevel }).map((_, i) => (
            <Flame key={i} className="w-3.5 h-3.5 text-primary" fill="hsl(24 85% 50%)" />
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
          <span className="font-body font-bold text-primary text-lg">${item.price.toFixed(2)}</span>
        </div>

        <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gold" fill="hsl(45 90% 55%)" />
            <span className="font-body text-sm font-medium text-foreground">{item.rating}</span>
            <span className="font-body text-xs text-muted-foreground">({item.reviews})</span>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground font-body font-medium text-sm px-4 py-2 rounded-full hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
