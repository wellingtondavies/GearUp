// Endereço da API. Sem .env, usa o JSON Server local iniciado por `npm run server`.
export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001";
