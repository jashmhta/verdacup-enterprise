import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/verdacup-logo-transparent.png" alt="VerdaCup" className="h-14 w-auto brightness-0 invert" />
              <div>
                <h3 className="text-2xl font-bold">VerdaCup</h3>
                <p className="text-xs opacity-80">Eco-Friendly Solutions</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Premium biodegradable cups manufacturer. Sustainable packaging solutions for a greener tomorrow.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="opacity-90 hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link href="/products" className="opacity-90 hover:opacity-100 transition-opacity">Products</Link></li>
              <li><Link href="/about" className="opacity-90 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link href="/contact" className="opacity-90 hover:opacity-100 transition-opacity">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=paper-cups" className="opacity-90 hover:opacity-100 transition-opacity">Paper Cups</Link></li>
              <li><Link href="/products?category=bagasse-cups" className="opacity-90 hover:opacity-100 transition-opacity">Bagasse Cups</Link></li>
              <li><Link href="/products?category=custom-printed" className="opacity-90 hover:opacity-100 transition-opacity">Custom Printed</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">info@verdacup.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} VerdaCup. All rights reserved. | Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
