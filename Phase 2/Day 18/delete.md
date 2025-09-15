# SQLite3 - Delete (D in CRUD)

`DELETE` ka use hota hai table ke andar ke data (rows) ko delete karne ke liye.  
⚠️ Note: `DELETE` sirf data ko remove karta hai, table ka schema (structure) safe rehta hai.

---

## 🔹 1. Ek row delete karna
```sql
DELETE FROM users
WHERE id = 1;
```
👉 sirf `id = 1` wali row delete ho gayi.

---

## 🔹 2. Multiple rows delete karna
```sql
DELETE FROM users
WHERE city = 'Karachi';
```
👉 jitne users `Karachi` ke hain sab delete ho gaye.

---

## 🔹 3. Sabhi rows delete karna
```sql
DELETE FROM users;
```
👉 table ke andar ka saara data delete ho gaya, lekin table abhi bhi exist karega (empty hoga).

---

## 🔹 4. Conditional delete (operators ke sath)
```sql
DELETE FROM users
WHERE age < 20;
```
👉 jinki age 20 se kam hai wo delete ho gaye.

---

## 🔹 5. Delete using IN clause
```sql
DELETE FROM users
WHERE city IN ('Lahore', 'Multan');
```
👉 Lahore aur Multan wale users delete ho gaye.

---

## 🔹 6. Delete with BETWEEN
```sql
DELETE FROM users
WHERE age BETWEEN 20 AND 25;
```
👉 age 20–25 ke beech wale users delete ho gaye.

---

## 🔹 7. Delete with foreign key (CASCADE)
Agar tumne **Foreign Key + ON DELETE CASCADE** constraint lagaya hai to parent delete hote hi child rows bhi delete ho jayengi.

```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    product TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

Ab agar tum `users` table me ek user delete karoge, to uske related `orders` bhi delete ho jayenge.

---

✅ Summary:
- **DELETE FROM table WHERE condition;** → specific rows delete
- **DELETE FROM table;** → saare rows delete (table empty)
- Foreign key cascade ke saath → related data bhi auto delete
