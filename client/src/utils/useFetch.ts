type FetchResult<T> = {
  data?: T;
  error?: string;
};

export const useFetch = async <T>(
  url: string,
  options: {
    method: "GET" | "POST";
    data?: any;
  }
): Promise<FetchResult<T>> => {
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
      const { message } = await response.json();
      return { error: `Error in the request: ${message}` };
    }

    const data: T = await response.json();
    return { data };
  } catch (error) {
    return { error: "Error during the request" };
  }
};
