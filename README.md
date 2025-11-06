# VerdaCup Enterprise Website

Premium biodegradable cups manufacturer website built with Next.js 15.

## 🌟 Features

- ✅ **Modern Stack**: Next.js 15, React 19, TypeScript
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **SEO Optimized**: Metadata, Open Graph, and structured data
- ✅ **Fast Performance**: Next.js App Router with server components
- ✅ **Product Showcase**: 7 biodegradable cup products with images
- ✅ **Complete Pages**: Home, Products, About, Contact, Cart, Orders
- ✅ **Database Ready**: Drizzle ORM with MySQL schema
- ✅ **API Routes**: tRPC setup for type-safe APIs

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jashmhta/verdacup-enterprise.git
cd verdacup-enterprise

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## 📦 Project Structure

```
verdacup-enterprise/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── cart/              # Shopping cart
│   ├── contact/           # Contact page
│   ├── products/          # Products listing
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/            # Header, Footer
│   ├── product/           # Product cards
│   └── cart/              # Cart components
├── lib/                   # Utilities and configuration
│   ├── _core/             # Core setup (tRPC, auth)
│   ├── db.ts              # Database functions
│   └── const.ts           # Constants
├── drizzle/               # Database schema
├── public/                # Static assets
│   └── images/            # Product images
└── tailwind.config.ts     # Tailwind configuration
```

## 🎨 Brand Colors

- **Primary (Forest Green)**: `#2D5016`
- **Secondary (Sage Green)**: `#7A9B54`
- **Accent (Terracotta)**: `#C1502E`
- **Background (Warm Beige)**: `#F4F1E8`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Configure environment variables (if needed)
5. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jashmhta/verdacup-enterprise)

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Connect your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Deploy!

### Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
DATABASE_URL=mysql://username:password@localhost:3306/verdacup
OWNER_OPENID=your_owner_id
```

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate database migrations
npm run db:push      # Push schema to database
```

## 🗄️ Database Setup

This project uses Drizzle ORM with MySQL. To set up the database:

1. Create a MySQL database
2. Add `DATABASE_URL` to `.env`
3. Run migrations:
   ```bash
   npm run db:push
   ```

## 📄 Pages

- **Home (/)**: Hero section, features, featured products, testimonials
- **Products (/products)**: Full product catalog with images
- **About (/about)**: Company mission and values
- **Contact (/contact)**: Contact form and information
- **Cart (/cart)**: Shopping cart (demo mode)
- **Orders (/orders)**: Order history (demo mode)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.4
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4
- **Language**: TypeScript 5
- **Database ORM**: Drizzle ORM
- **API**: tRPC
- **Icons**: Lucide React

## 📱 Features Roadmap

- [ ] Product detail pages
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Order management
- [ ] Admin dashboard
- [ ] Payment integration
- [ ] Email notifications

## 📞 Support

For questions or support, contact:
- Email: info@verdacup.com
- Phone: +91 98765 43210

## 📄 License

Copyright © 2025 VerdaCup. All rights reserved.

---

**Made with ❤️ for a greener tomorrow**
