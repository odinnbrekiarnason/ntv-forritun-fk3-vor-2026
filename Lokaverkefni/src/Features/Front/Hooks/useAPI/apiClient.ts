const previewBody = (body: string, maxLength = 160) => {
  const compact = body.replace(/\s+/g, " ").trim();
  return compact.length > maxLength ? `${compact.slice(0, maxLength)}...` : compact;
};

export async function parseApiJson<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const body = await response.text();

  if (!response.ok) {
    throw new Error(
      `API request failed with ${response.status} ${response.statusText} from ${response.url}. Body: ${previewBody(body)}`,
    );
  }

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error(
      `Expected JSON from ${response.url} but received ${contentType || "unknown content type"}. Body: ${previewBody(body)}`,
    );
  }

  try {
    return JSON.parse(body) as T;
  } catch {
    throw new Error(
      `Invalid JSON returned from ${response.url}. Body: ${previewBody(body)}`,
    );
  }
}