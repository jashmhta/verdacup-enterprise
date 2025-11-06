import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
}

export function SEOHead({
  title = 'VerdaCup - Biodegradable Cups Manufacturer in India',
  description = 'Premium biodegradable paper and bagasse cups manufacturer. Eco-friendly disposable cups for cafes, offices, and events. Made in India with 100% compostable materials.',
  keywords = 'biodegradable cups, paper cups, bagasse cups, eco-friendly cups, compostable cups, disposable cups India, sustainable packaging',
  image = '/verdacup-logo.png',
  url,
  type = 'website',
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };
    
    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:image', window.location.origin + image, true);
    
    if (url) {
      updateMetaTag('og:url', window.location.origin + url, true);
    }
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', window.location.origin + image);
    
    // Canonical URL
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', window.location.origin + url);
    }
  }, [title, description, keywords, image, url, type]);
  
  return null;
}
