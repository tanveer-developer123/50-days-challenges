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
    // Return errors if validation fails
    return res.status(400).json({ errors: errors.array() });
  }

  // Success
  res.send({ message: 'User registered successfully', user: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
