import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-divider" />
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="SHARE Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="font-display text-lg">SHARE</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              [Mission statement placeholder – Rescuing dogs, restoring hope, one paw at a time.]
            </p> {/* TO DO */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base mb-4 text-secondary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/70 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link to="/gallery" className="text-primary-foreground/70 hover:text-secondary transition-colors">Gallery</Link></li>
              <li><Link to="/donate" className="text-primary-foreground/70 hover:text-secondary transition-colors">Donate</Link></li>
              <li><Link to="/about" className="text-primary-foreground/70 hover:text-secondary transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base mb-4 text-secondary">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>share.official0594@gmail.com</li>
              <li>+63 939 350 5033</li>
              <li>Toril, Davao City</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-base mb-4 text-secondary">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/SoniaHomeforAnimalRescue/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded bg-primary-deepest text-primary-foreground/70 hover:bg-secondary hover:text-primary-deepest transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/soniahomeanimalrescue/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded bg-primary-deepest text-primary-foreground/70 hover:bg-secondary hover:text-primary-deepest transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@soniahomeanimalrescue"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded bg-primary-deepest text-primary-foreground/70 hover:bg-secondary hover:text-primary-deepest transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.14z"/>
                </svg>
              </a>
              <a
                href="mailto:share.official0594@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded bg-primary-deepest text-primary-foreground/70 hover:bg-secondary hover:text-primary-deepest transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
          © 2026 SHARE. All rights reserved. [Legal placeholder] {/* TO DO */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
