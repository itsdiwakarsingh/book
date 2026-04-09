import { isProductionApiMisconfigured } from "../utils/baseURL";

export default function ProductionApiWarning() {
    if (!isProductionApiMisconfigured()) return null;

    return (
        <div
            role="alert"
            className="bg-amber-500 text-black text-sm px-4 py-3 text-center font-medium"
        >
            Backend URL is missing for production. In Vercel → Settings → Environment Variables,
            add{" "}
            <code className="bg-black/10 px-1 rounded">VITE_API_URL</code> = your deployed API
            origin (e.g. <code className="bg-black/10 px-1 rounded">https://api.example.com</code>
            ), enable it for <strong>Production</strong> and <strong>Preview</strong>, then trigger a
            new deployment. The chunk size message in build logs is only a warning, not an error.
        </div>
    );
}
