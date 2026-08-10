// Configurações centralizadas por ambiente
export const config = {
  env: import.meta.env.VITE_ENV || "development",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5175",
  isDev: import.meta.env.VITE_ENV === "development",
  isProd: import.meta.env.VITE_ENV === "production",
}
