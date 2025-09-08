// app.js

// Example: page load par console log
console.log("Frontend JS loaded!");

// Example: button click par alert
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#alertBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      alert("Hello Malik! This is coming from app.js 🚀");
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#alertBtn");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // form ko submit hone se roko
      alert("Your message has been sent successfully ✅");
    });
  }
});
