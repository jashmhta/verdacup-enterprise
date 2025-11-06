export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';

// E-commerce constants
export const APP_TITLE = "VerdaCup";
export const APP_LOGO = "/verdacup-logo.png";
export const CURRENCY = "₹";
export const CURRENCY_CODE = "INR";

// Format price from paise to rupees
export function formatPrice(paise: number): string {
  const rupees = paise / 100;
  return `${CURRENCY}${rupees.toFixed(2)}`;
}

// Convert rupees to paise
export function toPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

// Get login URL (client-side only)
export function getLoginUrl(redirectTo?: string): string {
  if (typeof window === 'undefined') return '#';
  const redirect = redirectTo || window.location.pathname;
  const appId = import.meta.env.VITE_APP_ID;
  const oauthPortal = import.meta.env.VITE_OAUTH_PORTAL_URL;
  return `${oauthPortal}?app_id=${appId}&redirect_uri=${encodeURIComponent(
    window.location.origin + "/api/oauth/callback?redirect=" + encodeURIComponent(redirect)
  )}`;
}
