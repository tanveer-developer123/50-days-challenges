# SQLite3 - Update (U in CRUD)

SQLite me update do type ka hota hai:

---

## 1️⃣ Table Update (Schema Update with ALTER TABLE)

`ALTER TABLE` ka use table ke structure ko badalne ke liye hota hai.

### Add new column
```sql
ALTER TABLE users ADD COLUMN phone TEXT;
```

### Rename column
```sql
ALTER TABLE users RENAME COLUMN phone TO mobile;
```

### Rename table
```sql
ALTER TABLE users RENAME TO customers;
```

### Add column with default value
```sql
ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active';
```

⚠️ SQLite me direct column delete ya datatype change karna allow nahi hai.  
Agar column remove ya modify karna ho to naya table banana padta hai aur data migrate karna padta hai.

---

## 2️⃣ Data Update (Row Update with UPDATE)

`UPDATE` ka use table ke andar ke data ko change karne ke liye hota hai.

### Single column update
```sql
UPDATE users
SET age = 21
WHERE name = 'Ali';
```

### Multiple columns update
```sql
UPDATE users
SET age = 23, city = 'Faisalabad'
WHERE name = 'Sara';
```

### Update all rows
```sql
UPDATE users
SET city = 'Pakistan';
```

### Conditional update with operators
```sql
UPDATE users
SET age = age + 1
WHERE age < 25;
```

### Update with CASE (if-else logic)
```sql
UPDATE users
SET status = CASE
    WHEN age < 20 THEN 'teen'
    WHEN age BETWEEN 20 AND 25 THEN 'young'
    ELSE 'adult'
END;
```

### Update from another table (advanced)
```sql
UPDATE users
SET city = (
    SELECT new_city FROM temp_users WHERE temp_users.id = users.id
);
```

---

✅ Summary:
- **ALTER TABLE** → Table (schema) update  
- **UPDATE** → Data (rows) update
