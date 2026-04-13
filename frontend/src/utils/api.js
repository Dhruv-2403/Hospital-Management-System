// src/utils/api.js

const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
// Strip trailing slash if present
export const API_URL = rawUrl.replace(/\/$/, "");
export const API_BASE = API_URL;
