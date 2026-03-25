import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBanner}
        alt="Indian food feast spread"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-wood/70 via-dark-wood/50 to-dark-wood/80" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p
          className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-gold mb-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Welcome to
        </p>
        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Spice Heaven
        </h1>
        <p
          className="font-display text-xl md:text-2xl italic text-gold/90 mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          Authentic Indian Flavors
        </p>
        <Link
          to="/menu"
          className="inline-block bg-gradient-warm text-primary-foreground font-body font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.8s" }}
        >
          Order Now
        </Link>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up" style={{ animationDelay: "1.2s" }}>
        <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-cream/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
