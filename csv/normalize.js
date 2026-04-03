export function normalizeRow(row) {
  let [id, name, price, category] = row;

  const issues = [];

  const idValue = id?.trim() ?? "Unknown";

  const nameValue = name?.trim();
  if (!nameValue) {
    issues.push("Missing name");
    name = "Unknown";
  } else {
    name = nameValue;
  }

  const priceValue = price?.trim();
  const numericPrice = Number(priceValue);
  if (!priceValue || Number.isNaN(numericPrice)) {
    issues.push("Invalid price");
    price = null;
  } else {
    price = numericPrice;
  }

  const categoryValue = category?.trim();
  if (!categoryValue) {
    issues.push("Missing category");
    category = "Unknown";
  } else {
    category = categoryValue;
  }

  return {
    id: idValue,
    name,
    price,
    category,
    issues,
    isValid: issues.length === 0,
  };
}
