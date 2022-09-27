export function applyPropFilter<T extends Record<string, any>>(
  items: T[],
  filters: Partial<T>,
  checkType: "inclusion" | "exclusion" = "inclusion"
): T[] {
  return items.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (checkType === "inclusion") return item[key] === filters[key];
      else return item[key] !== filters[key];
    });
  });
}
