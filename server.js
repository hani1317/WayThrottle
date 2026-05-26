const express = require('express');

const mysql = require('mysql2/promise');

const path = require('path');

const app = express();

const PORT = 3000;



// STATIC FILES

app.use(express.static(
  path.join(__dirname, 'public')
));

app.use(express.json());

// MYSQL

let db;

async function connectDB() {

  try {

    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '73159421306vkook.',
      database: 'WayThrottle'
    });

    console.log('MySQL подключен');

  } catch (error) {

    console.error(
      'Ошибка подключения:',
      error
    );

  }

}

connectDB();



// API TYPES

app.get('/api/types', async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM types
      ORDER BY id
    `);

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Ошибка сервера'
    });

  }

});

// ПОЛУЧИТЬ ВСЕ МОТОЦИКЛЫ

app.get('/api/motorcycles', async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM motorcycles
      ORDER BY brand, name
    `);

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Ошибка сервера'
    });

  }

});

// ПОЛУЧИТЬ ОДИН МОТОЦИКЛ

app.get('/api/motorcycles/:id', async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM motorcycles
      WHERE id = ?
    `, [req.params.id]);

    if (rows.length === 0) {

      return res.status(404).json({
        error: 'Мотоцикл не найден'
      });

    }

    res.json(rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Ошибка сервера'
    });

  }

});

// START SERVER

app.listen(PORT, () => {

  console.log(
    `Сервер запущен: http://localhost:${PORT}`
  );

});