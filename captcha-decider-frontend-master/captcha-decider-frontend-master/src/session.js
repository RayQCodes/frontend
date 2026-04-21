export function ensureSessionId() {
  const existing = readCookie("cds_session");
  if (existing) return existing;
  const value = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
  document.cookie = `cds_session=${value}; path=/; max-age=${60 * 60 * 24 * 7}`;
  return value;
}

function readCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}
