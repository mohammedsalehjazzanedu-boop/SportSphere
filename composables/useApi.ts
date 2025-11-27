import axios, { AxiosError } from "axios";
import { useRuntimeConfig } from "#app";

export default async function useApi(endpoint: string, options: any = {}) {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBase}/${endpoint}`;

  try {
    const response = await axios({
      method: options.method || 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        "Content-Type": "application/json",
        lang: "ar",
        ...options.headers,
      },
      data: options.body || null,
    });

    return { data: response.data, error: null };
  } catch (err) {
    const error = err as AxiosError; 

    console.error("API request error:", error);

    return {
      data: null,
      error: error.response ? error.response.data : error.message,
    };
  }
}
