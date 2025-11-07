import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#2D5016] to-[#234010] text-white" data-testid="footer">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div>
                <span className="text-xl font-bold">VerdaCup</span>
                <p className="text-xs opacity-80">Eco-Friendly Cups</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Leading manufacturer of 100% biodegradable cups in India. Sustainable solutions for a greener tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="opacity-80 hover:opacity-100 transition-opacity">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li className="opacity-80">Paper Cups</li>
              <li className="opacity-80">Bagasse Cups</li>
              <li className="opacity-80">Custom Printed</li>
              <li className="opacity-80">Bulk Orders</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@verdacup.com" className="opacity-80 hover:opacity-100 transition-opacity">
                  info@verdacup.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+919876543210" className="opacity-80 hover:opacity-100 transition-opacity">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="opacity-80">
                  Mumbai, Maharashtra<br />India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            &copy; {new Date().getFullYear()} VerdaCup. All rights reserved. | Made in India with ❤️ for the Environment
          </p>
        </div>
      </div>
    </footer>
  );
}