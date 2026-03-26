import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    
    { to: "/cart", label: "Cart" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-wood/95 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-2xl font-bold text-gradient-warm">
          Spice Heaven
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-body text-sm font-medium tracking-wide transition-colors ${
                location.pathname === l.to ? "text-primary" : "text-cream hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 text-cream hover:text-primary transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-scale-in">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-cream" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-wood/98 border-t border-primary/20 animate-fade-in">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 text-cream hover:text-primary hover:bg-primary/10 font-body transition-colors"
            >
              {l.label}
              {l.label === "Cart" && totalItems > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
