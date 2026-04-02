fetch("./csv/data.csv")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to load CSV file");
    }
    return res.text();
  })
  .then((csv) => {
    const rows = csv.split(/\r?\n/).filter((row) => row.trim() !== "");

    const headers = rows[0].split(",");

    const result = rows.slice(1).map((row) => {
      let [id, name, price, category] = row.split(",");

      const issues = [];

      const idValue = id?.trim();

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
    });

    console.log("Headers:", headers);
    console.log("Normalized data:", result);

    const validItems = result.filter((item) => item.isValid);
    const invalidItems = result.filter((item) => !item.isValid);

    console.log("Valid items:", validItems);
    console.log("Invalid items:", invalidItems);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
