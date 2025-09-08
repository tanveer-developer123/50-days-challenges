console.log("🚀 UI Loaded Successfully!");

// Example fetch (dummy)
fetch("/api/products")
  .then(res => res.json())
  .then(data => console.log("Products:", data))
  .catch(err => console.error(err));
