// crypto.randomUUID only exists in secure contexts (https or localhost).
// If you test on your phone over http://192.168.x.x it is undefined,
// so we fall back to a timestamp plus random string.
export function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `q-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
