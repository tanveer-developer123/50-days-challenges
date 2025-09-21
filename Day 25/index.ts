import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';

// Types for user data
interface User {
  id: number;
  name: string;
  email: string;
  country: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Initialize app and DB
const db = new sqlite3.Database('./database.db');
const app = express();
const PORT = 3000;
app.use(express.json());

// GET /users endpoint
app.get('/users', async (req: Request, res: Response) => {
  try {
    // Query params with defaults
    const { page = '1', limit = '10', country, search } = req.query;

    // Convert to numbers and validate
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
      return res.status(400).json({ error: 'Page ya limit galat hai' });
    }

    // Build WHERE clause dynamically
    let whereClause = '';
    const params: (string | number)[] = [];

    if (country) {
      whereClause += ' WHERE country = ?';
      params.push(country as string);
    }
    if (search) {
      const searchCondition = ' (name LIKE ? OR email LIKE ?)';
      whereClause += whereClause ? ' AND' + searchCondition : ' WHERE' + searchCondition;
      params.push(`%${search}%`, `%${search}%`);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM users${whereClause}`;
    const totalResult = await new Promise<{ total: number }>((resolve, reject) => {
      db.get(countQuery, params, (err, row: { total: number }) => {
        if (err) reject(err);
        resolve(row);
      });
    });

    // Get paginated data
    const offset = (pageNum - 1) * limitNum;
    const dataQuery = `SELECT * FROM users${whereClause} LIMIT ? OFFSET ?`;
    const queryParams = [...params, limitNum, offset];
    const users = await new Promise<User[]>((resolve, reject) => {
      db.all(dataQuery, queryParams, (err, rows: User[]) => {
        if (err) reject(err);
        resolve(rows);
      });
    });

    // Response
    const response: { users: User[]; pagination: Pagination } = {
      users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalResult.total,
        totalPages: Math.ceil(totalResult.total / limitNum),
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Kuch toh gadbad hai' });
  }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is Running in localhost:${PORT}`)
});