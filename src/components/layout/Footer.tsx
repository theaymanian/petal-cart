import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12 mt-20">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-lg font-semibold mb-3 text-foreground">AdamFlowers</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Premium floral arrangements crafted with passion. Every bouquet tells a story of elegance and care.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-sm font-semibold mb-3 text-foreground">Quick Links</h4>
          <div className="space-y-2">
            {[{ to: '/shop', label: 'Shop' }, { to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }].map(l => (
              <Link key={l.to} to={l.to} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-serif text-sm font-semibold mb-3 text-foreground">Contact</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>hello@adamflowers.com</p>
            <p>+971 50 123 4567</p>
            <p>Dubai, UAE</p>
          </div>
        </div>
      </div>
      <div className="container mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © 2026 AdamFlowersShop. All rights reserved.
      </div>
    </footer>
  );
}
