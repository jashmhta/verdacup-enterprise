import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
              V
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-2xl font-bold text-primary leading-none">VerdaCup</span>
              <span className="text-xs text-muted-foreground font-medium">Eco-Friendly Solutions</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors font-medium">
              Products
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-accent/10 rounded-md transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </Link>

          <button className="md:hidden p-2 hover:bg-accent/10 rounded-md transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
