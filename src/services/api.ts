export const createApiClient = (baseUrl: string) => ({
  get: async <T,>(url: string) => {
    const res = await fetch(`${baseUrl}${url}`);
    if (!res.ok) throw new Error(await res.text() || 'An error occurred while fetching data');
    return res.json() as Promise<T>;
  },
  post: async <T,>(url: string, body: any) => {
    const res = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(await res.text() || 'An error occurred during PATCH');
    return res.json() as Promise<T>;
  },
  delete: async <T,>(url: string) => {
    const res = await fetch(`${baseUrl}${url}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(await res.text() || 'An error occurred during DELETE');
    return res.json() as Promise<T>;
  }
});

export const catalogApi = createApiClient('http://localhost:8080');
export const ordersApi = createApiClient('http://localhost:8081');
