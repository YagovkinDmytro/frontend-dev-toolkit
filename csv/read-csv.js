import { normalizeRow } from "./normalize.js";

fetch("./csv/data.csv")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to load CSV file");
    }
    return res.text();
  })
  .then((csv) => {
    const rows = csv.split(/\r?\n/).filter((row) => row.trim() !== "");

    const headers = rows[0].split(",").map((h) => h.trim());

    const result = rows.slice(1).map((row) => {
      const columns = row.split(",");
      return normalizeRow(columns);
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
