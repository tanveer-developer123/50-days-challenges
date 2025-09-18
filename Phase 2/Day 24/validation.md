# Validation with express-validator

## 1. Introduction

**Validation** ka kaam hai user input ya API request data ko check karna aur ensure karna ki wo expected format aur rules ke according ho.

**express-validator** ek Node.js/Express middleware hai jo:

* Validation (check rules)
* Sanitization (clean data)
* Error handling

### Use Cases:

* Login / Register forms
* Contact forms
* API request validation

---

## 2. Installation

```bash
npm install express express-validator
npm install --save-dev typescript ts-node @types/express @types/express-validator nodemon
```

---

## 3. Basic Usage

### Folder Structure

```
project/
├── src/
│   └── App.ts
├── package.json
├── tsconfig.json
```

### App.ts Example

```ts
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register route with validation
app.post('/register', [
  body('name')
    .notEmpty().withMessage('Name is required')
    .trim().escape(),
  body('email')
    .isEmail().withMessage('Enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], (req: Request, res: Response) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.send({ message: 'User registered successfully', user: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## 4. Validators

| Validator            | Example                                 | Use                |
| -------------------- | --------------------------------------- | ------------------ |
| notEmpty()           | `body('name').notEmpty()`               | Required field     |
| isEmail()            | `body('email').isEmail()`               | Email format check |
| isLength({ min: 6 }) | `body('password').isLength({ min: 6 })` | Min length         |
| matches(/regex/)     | `body('username').matches(/^[a-z]+$/)`  | Custom pattern     |

---

## 5. Sanitizers

| Sanitizer        | Example                          | Use                      |
| ---------------- | -------------------------------- | ------------------------ |
| trim()           | `body('name').trim()`            | Remove spaces            |
| escape()         | `body('name').escape()`          | Prevent XSS              |
| normalizeEmail() | `body('email').normalizeEmail()` | Correct email formatting |

---

## 6. Flow Summary

1. User submits data (form/API request)
2. Validation rules check input
3. `validationResult(req)` collects errors
4. If errors → return JSON errors
5. If valid → process data (DB insert etc.)

---

## 7. Postman Testing

* **POST** request → `http://localhost:3000/register`
* **Body → raw → JSON**

### Invalid Data Example:

```json
{
  "name": "",
  "email": "abc@.com",
  "password": "123"
}
```

**Response:**

```json
{
  "errors": [
    { "msg": "Name is required", "param": "name", "location": "body" },
    { "msg": "Enter a valid email", "param": "email", "location": "body" },
    { "msg": "Password must be at least 6 characters", "param": "password", "location": "body" }
  ]
}
```

### Valid Data Example:

```json
{
  "name": "Ali",
  "email": "ali@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "name": "Ali",
    "email": "ali@example.com",
    "password": "123456"
  }
}
```

---

## 8. Limitations

* Small projects / API routes me convenient
* Large projects me better options:

  * Joi → Schema-based validation
  * Zod → TypeScript friendly
  * class-validator → Class + decorators

---

## 9. Conclusion

* **express-validator**: Quick validation & sanitization
* Returns **errors JSON** for invalid input
* Valid input → Safe to process
* Lightweight, easy to integrate with Express routes
