# 📘 Express.js Learning Journey (Day 1 - Day 14)

## 1️⃣ What is Express? Setup Node + nodemon + Express App ✅
- Express is a Node.js framework for building web applications and APIs.
- **Setup:** Install Node.js → `npm init` → install `express` → install `nodemon` for auto-reload.
- Created first app with `app.get()` and `app.listen()`.

---

## 2️⃣ app.listen(), req & res objects ✅
- `app.listen(PORT)` starts the server.
- **req** = request object (data from client).
- **res** = response object (data sent back to client).

---

## 3️⃣ Routes: app.get(), app.post(), RESTful routes ✅
- `app.get("/route", callback)` → GET request.
- `app.post("/route", callback)` → POST request.
- RESTful routes follow CRUD (Create, Read, Update, Delete).

---

## 4️⃣ Route Parameters and Query Strings ✅
- **Route params:** `/user/:id` → `req.params.id`
- **Query strings:** `/search?name=Ali` → `req.query.name`

---

## 5️⃣ Express Middleware: Basics, Custom Middleware ✅
- Middleware are functions that run between request and response.
- Example: `app.use(express.json())`.
- Custom middleware example for logging request details.

---

## 6️⃣ Serving Static Files (images, HTML, etc.) ✅
- `app.use(express.static("public"))`
- Used for serving frontend HTML, CSS, JS, images.

---

## 7️⃣ Templating Engines: EJS or Pug ✅
- **EJS** allows embedding JS into HTML templates.
- Used to generate **dynamic UI** on server side.

---

## 8️⃣ JSON Response & res.json() ✅
- Send JSON response with `res.json({ key: value })`.
- Useful for APIs.

---

## 9️⃣ Project: Mini REST API without DB ✅
- Created mini API with GET, POST, PUT, DELETE routes.
- Data stored temporarily in an array.

---

## 🔟 HTTP Status Codes & Headers ✅
- Example: `res.status(200).json({ message: "OK" })`
- Common codes:
  - **200** (OK)
  - **201** (Created)
  - **400** (Bad Request)
  - **404** (Not Found)
  - **500** (Server Error)

---

## 1️⃣1️⃣ Error Handling (next(), error middleware) ✅
- Custom error middleware with:
  ```js
  app.use((err, req, res, next) => {...})
