import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Footer from "@/components/Footer";

const CartPage = () => {
  const { items, restaurant, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toast.success("Order placed! Tracking your delivery... 🚴");
    navigate("/order-tracking");
  };

  if (items.length === 0) {
    return (
      <main className="pt-16">
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
          <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mb-6" />
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="font-body text-muted-foreground mb-8">Add some delicious dishes to get started!</p>
          <Link
            to="/restaurants"
            className="bg-gradient-warm text-primary-foreground font-body font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
          >
            Browse Restaurants
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="pt-16">
      <div className="bg-dark-wood py-12 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-cream">Your Cart</h1>
        {restaurant && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-body text-sm text-cream/70">Ordering from {restaurant.name}</span>
          </div>
        )}
        <div className="w-20 h-1 bg-gradient-warm mx-auto mt-4 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-card p-4 rounded-lg shadow-[var(--shadow-card)] animate-fade-in"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  loading="lazy"
                  width={80}
                  height={80}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground truncate">{item.name}</h3>
                  <p className="font-body text-sm text-muted-foreground">₹{item.price} each</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-body font-bold w-8 text-center text-foreground">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <p className="font-body font-bold text-primary w-20 text-right">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => {
                    removeItem(item.id);
                    toast.info(`${item.name} removed`);
                  }}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 bg-card p-6 rounded-lg shadow-[var(--shadow-card)]">
            <div className="space-y-2 mb-4 font-body text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹49</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{Math.round(totalPrice * 0.05)}</span>
              </div>
            </div>
            <div className="border-t border-border pt-4 flex justify-between items-center mb-6">
              <span className="font-display text-2xl font-bold text-foreground">Total</span>
              <span className="font-display text-3xl font-bold text-primary">
                ₹{totalPrice + 49 + Math.round(totalPrice * 0.05)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-warm text-primary-foreground font-body font-bold text-lg py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CartPage;
