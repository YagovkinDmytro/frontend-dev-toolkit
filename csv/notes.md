# CSV Data Handling in Frontend

Working with CSV files is a common task in frontend development, especially when dealing with imports, exports, or third-party data.

---

## 📄 What is CSV

CSV (Comma-Separated Values) is a plain text format used to store tabular data.

Example:

```
id,name,price,category
1,Apple,1.2,Fruit
2,Banana,0.8,Fruit
```

Each line represents a row, and values are separated by commas.

---

## ⚠️ Real-World Problems

In real applications, CSV data is often not clean.

Common issues:

- Missing values
- Extra whitespace (`"   "`)
- Invalid numbers (`"abc"`)
- Mixed data types
- Inconsistent formatting

Example of problematic data:

```
4,,1.5,Fruit
5,Tomato,abc,Vegetable
6,Orange, ,Fruit
```

---

## 🔍 Parsing CSV in JavaScript

Basic approach:

```js
const rows = csv.split(/\r?\n/).filter(Boolean);
const headers = rows[0].split(",");

const data = rows.slice(1).map((row) => row.split(","));
```

Important Concept: Everything is a String

When parsing CSV:

```
const [id, name, price] = row.split(",");

All values are strings:

"1"
"1.2"
"Apple"

You must convert them manually.
```

🔄 Data Normalization

Normalization means converting raw data into a consistent and usable format.

Example:

```
const numericPrice = Number(price);

if (!price.trim() || Number.isNaN(numericPrice)) {
  price = null;
} else {
  price = numericPrice;
}
```

✅ Validation Rules

Typical validation:

Strings

```
if (!value.trim()) {
value = "Unknown";
}
```

Numbers

```
const num = Number(value);

if (!value.trim() || Number.isNaN(num)) {
value = null;
}
```

⚠️ Important Edge Cases
Empty string

```
Number("") // 0
```

This can hide errors if not handled properly.

Whitespace

```
Number(" ") // 0

```

Always use .trim() before validation.

NaN behavior

```
NaN !== NaN
```

Correct check:

Number.isNaN(value)
🧩 Choosing Between 0 and null

- 0 → valid value
- null → missing or invalid data

Example:

```
price = null // better for invalid data
```

🧠 Best Practices

- Always trim values before validation
- Convert types explicitly
- Do not assume data is clean
- Keep invalid data traceable (e.g., issues array)
- Do not over-validate without business requirements

💡 Example Normalized Object

```
{
id: "5",
name: "Tomato",
price: null,
category: "Vegetable",
issues: ["Invalid price"],
isValid: false
}
```

🚀 Summary

Working with CSV is not just parsing strings.

It requires:

- understanding data structure
- handling edge cases
- making safe assumptions
- preparing data for UI

Good data handling improves application stability and user experience.
