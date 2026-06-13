const trimPreview = (text: string, maxLength = 120): string => {
  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized.length > maxLength
    ? `${normalized.slice(0, maxLength)}...`
    : normalized;
};

export const parseApiJson = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get("content-type") ?? "";
  const rawBody = await response.text();

  if (!response.ok) {
    throw new Error(
      `API request failed (${response.status}) at ${response.url}. ` +
        `Body preview: ${trimPreview(rawBody)}`,
    );
  }

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error(
      `Expected JSON but got '${contentType || "unknown"}' from ${response.url}. ` +
        `Body preview: ${trimPreview(rawBody)}`,
    );
  }

  try {
    return JSON.parse(rawBody) as T;
  } catch {
    throw new Error(
      `Invalid JSON received from ${response.url}. ` +
        `Body preview: ${trimPreview(rawBody)}`,
    );
  }
};