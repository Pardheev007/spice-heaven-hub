import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => (
  <footer className="bg-dark-wood text-cream py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-2xl font-bold text-gradient-warm mb-4">Spice Heaven</h3>
          <p className="font-body text-sm text-cream/70 leading-relaxed">
            Bringing the rich, authentic flavors of India to your table since 2010. Every dish is crafted with love and tradition.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold text-gold mb-4">Contact</h4>
          <div className="space-y-3 font-body text-sm text-cream/70">
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> 123 Curry Lane, Flavor City</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> (555) 123-4567</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Mon-Sun: 11AM - 10PM</div>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold text-gold mb-4">Quick Links</h4>
          <div className="space-y-2 font-body text-sm text-cream/70">
            <p className="hover:text-primary cursor-pointer transition-colors">About Us</p>
            <p className="hover:text-primary cursor-pointer transition-colors">Catering</p>
            <p className="hover:text-primary cursor-pointer transition-colors">Gift Cards</p>
            <p className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</p>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 mt-10 pt-6 text-center font-body text-xs text-cream/40">
        © 2026 Spice Heaven. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
