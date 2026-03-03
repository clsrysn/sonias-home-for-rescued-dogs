import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/donate", label: "Donate" },
  { to: "/about", label: "About" },
];

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary-deepest shadow-lg">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-secondary">
            <Heart className="h-6 w-6 text-primary-deepest" fill="currentColor" />
          </div>
          <span className="font-display text-xl text-primary-foreground tracking-wide">
            SHARE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/donate">
            <Button variant="cta" size="sm" className="ml-3">
              Donate
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-primary-foreground p-2"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-primary-deepest border-t border-primary/30 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm font-semibold ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary/30"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Link to="/donate" onClick={() => setMobileOpen(false)}>
              <Button variant="cta" className="w-full">Donate</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
