export const apiFetch = async (url, options = {}) => {
  try {
    // Add default Cache-Control to prevent stale API responses
    const fetchOptions = {
      ...options,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...(options.headers || {})
      }
    };
    
    const res = await fetch(url, fetchOptions);
    
    // Check if the response is JSON
    const contentType = res.headers.get("content-type");
    let data;
    if (contentType && contentType.indexOf("application/json") !== -1) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      if (res.status === 401) {
        console.warn('API: Unauthorized access');
        // Handle global logout if needed, but currently handled via Context
      }
      throw new Error((data && data.message) || `HTTP Error ${res.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`[API Fetch Error] ${url}:`, error);
    throw error;
  }
};
