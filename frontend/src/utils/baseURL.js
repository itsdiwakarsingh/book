/**
 * API origin only (no trailing /api). Local default: localhost:5000.
 * Production: set VITE_API_URL in Vercel → Environment Variables → Production (and Preview),
 * then redeploy. Example: https://your-api.onrender.com (not http://localhost:5000).
 */
const getBaseUrl = () => {
    let raw = import.meta.env.VITE_API_URL?.trim();
    if (raw) {
        raw = raw.replace(/\/$/, "");
        if (raw.endsWith("/api")) raw = raw.slice(0, -4);
        return raw;
    }
    return "http://localhost:5000";
};

/** True when the live site will call localhost (will always fail in the browser). */
export const isProductionApiMisconfigured = () =>
    Boolean(import.meta.env.PROD && !import.meta.env.VITE_API_URL?.trim());

export default getBaseUrl;
