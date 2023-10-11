export const useFetch = async <T>(
  url: string,
  options: {
    method: "GET" | "POST";
    data?: any;
  }
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: options.method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        options.method === "POST" ? JSON.stringify(options.data) : undefined,
    });

    if (!response.ok) {
      throw new Error("Errore nella richiesta");
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
