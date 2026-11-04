// POST /api/auth: tells the editor login form whether the password is right.
import { isEditor, json } from "../../lib/auth.js";

export async function onRequestPost({ request, env }) {
  return (await isEditor(request, env)) ? json({ ok: true }) : json({ error: "wrong_password" }, 401);
}
