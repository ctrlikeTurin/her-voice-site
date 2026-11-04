// GET /media/<id>: serves an uploaded photo or video, with Range support so videos can seek.

export async function onRequestGet({ params, request, env }) {
  const id = String(params.id || "");
  if (!/^[0-9a-f]{32}$/.test(id)) return new Response("Not found", { status: 404 });
  const { value, metadata } = await env.SITE.getWithMetadata("media:" + id, "arrayBuffer");
  if (!value) return new Response("Not found", { status: 404 });

  const headers = {
    "Content-Type": (metadata && metadata.type) || "application/octet-stream",
    "Cache-Control": "public, max-age=31536000, immutable",
    "Accept-Ranges": "bytes",
    "X-Content-Type-Options": "nosniff",
  };
  const size = value.byteLength;
  const m = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("Range") || "");
  if (m && (m[1] || m[2])) {
    let start = m[1] ? Number(m[1]) : size - Number(m[2]);
    let end = m[1] && m[2] ? Number(m[2]) : size - 1;
    start = Math.max(0, start);
    end = Math.min(end, size - 1);
    if (start > end) return new Response(null, { status: 416, headers: { "Content-Range": "bytes */" + size } });
    headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
    headers["Content-Length"] = String(end - start + 1);
    return new Response(value.slice(start, end + 1), { status: 206, headers });
  }
  headers["Content-Length"] = String(size);
  return new Response(value, { headers });
}
