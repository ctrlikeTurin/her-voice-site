// GET /api/data: the saved site content (text, team, media lists).
// PUT /api/data: replaces it; editors only.
import { isEditor, json } from "../../lib/auth.js";

const MAX_BYTES = 512 * 1024;

export async function onRequestGet({ env }) {
  const data = await env.SITE.get("site", "json");
  return json(data || { v: 1 });
}

export async function onRequestPut({ request, env }) {
  if (!(await isEditor(request, env))) return json({ error: "not_editor" }, 401);
  const body = await request.text();
  if (body.length > MAX_BYTES) return json({ error: "too_large" }, 413);
  let data;
  try { data = JSON.parse(body); } catch { return json({ error: "bad_json" }, 400); }
  if (!data || typeof data !== "object" || Array.isArray(data)) return json({ error: "bad_json" }, 400);
  await env.SITE.put("site", JSON.stringify(data));
  return json({ ok: true });
}
