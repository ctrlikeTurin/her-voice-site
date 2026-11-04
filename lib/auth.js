// Shared helpers for Pages Functions: editor-password check and JSON responses.

const enc = new TextEncoder();

async function digest(s) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(s)));
}

export async function isEditor(request, env) {
  const given = request.headers.get("X-Edit-Key") || "";
  if (!env.EDIT_PASSWORD || !given) return false;
  const [a, b] = await Promise.all([digest(given.trim()), digest(String(env.EDIT_PASSWORD).trim())]);
  return crypto.subtle.timingSafeEqual(a, b);
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
