export const createApiClient = (baseUrl: string) => {
  const getHeaders = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };
    const token = localStorage.getItem('admin_token');
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  };

  return {
    get: async <T,>(url: string) => {
      const res = await fetch(`${baseUrl}${url}`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(await res.text() || 'An error occurred while fetching data');
      return res.json() as Promise<T>;
    },
    post: async <T,>(url: string, body: any) => {
      const res = await fetch(`${baseUrl}${url}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(body)
      });
      const contentType = res.headers.get("content-type");
      if (!res.ok) throw new Error(await res.text() || 'An error occurred during POST');
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return res.json() as Promise<T>;
      } else {
        return res.text() as unknown as Promise<T>;
      }
    },
    patch: async <T,>(url: string, body: any) => {
      const res = await fetch(`${baseUrl}${url}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(await res.text() || 'An error occurred during PATCH');
      return res.json() as Promise<T>;
    },
    delete: async <T,>(url: string) => {
      const res = await fetch(`${baseUrl}${url}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(await res.text() || 'An error occurred during DELETE');
      return res.json() as Promise<T>;
    }
  };
};

const API_BASE_URL = 'http://localhost:8000';

export const api = createApiClient(API_BASE_URL);
