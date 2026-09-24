const KEY = "okneil-wishlist";

export function getWishlistIds() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isSaved(id) {
  return getWishlistIds().includes(id);
}

export function toggleSaved(id) {
  const ids = getWishlistIds();
  const next = ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("wishlist-updated"));
  return next;
}
