export const CATEGORIES = [
  { value: "fashion", label: "Fashion", color: "#E85D04", tile: "#FCEBDD" },
  { value: "beauty", label: "Beauty", color: "#C24545", tile: "#FBE4E4" },
  { value: "electronics", label: "Electronics", color: "#3B5BA5", tile: "#E9EEF9" },
  { value: "essentials", label: "Essentials", color: "#B98A00", tile: "#FDF3D6" },
  { value: "accessories", label: "Accessories", color: "#6E4FA3", tile: "#EFE9F7" }
];

export function categoryMeta(value) {
  return CATEGORIES.find(c => c.value === value) || CATEGORIES[0];
}
