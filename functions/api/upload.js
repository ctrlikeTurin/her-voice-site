// POST /api/upload: stores one photo or video (raw request body) in KV; editors only.
// Returns { id }, served back at /media/<id>.
import { isEditor, json } from "../../lib/auth.js";

const MAX_BYTES = 20 * 1024 * 1024;
const TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "video/mp4", "video/webm"];

export async function onRequestPost({ request, env }) {
  if (!(await isEditor(request, env))) return json({ error: "not_editor" }, 401);
  const type = (request.headers.get("Content-Type") || "").split(";")[0].trim();
  if (!TYPES.includes(type)) return json({ error: "unsupported_type" }, 415);
  const declared = Number(request.headers.get("Content-Length") || 0);
  if (declared > MAX_BYTES) return json({ error: "too_large" }, 413);
  const buf = await request.arrayBuffer();
  if (buf.byteLength > MAX_BYTES) return json({ error: "too_large" }, 413);
  if (!buf.byteLength) return json({ error: "empty" }, 400);

  const id = [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, "0")).join("");
  await env.SITE.put("media:" + id, buf, { metadata: { type } });
  return json({ id });
}
