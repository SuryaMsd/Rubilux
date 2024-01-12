const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', // often 'localhost'
    database: 'rubilux',
    password: 'root',
    port: 5432, // Change this to the port you've chosen during PostgreSQL installation
  });

// Endpoint to handle POST requests for creating a new dealer
app.post('http://127.0.0.1:5500/api/saveDealer', async (req, res) => {
    try {
      const { dealerName, dealerMobile, dealerPlace } = req.body;
  
      const queryText = 'INSERT INTO Dealer (DealerName, Mobile, Place) VALUES ($1, $2, $3)';
      const values = [dealerName, dealerMobile, dealerPlace];
  
      await pool.query(queryText, values);
  
      res.status(201).json({ message: 'Dealer data saved successfully' });
    } catch (error) {
      console.error('Error saving Dealer data:', error);
      res.status(500).json({ error: 'Failed to save Dealer data' });
    }
  });

// Similar endpoint for saving Painter data

// Endpoint to handle POST requests for creating a new painter
app.post('http://127.0.0.1:5432/api/savePainter', async (req, res) => {
    try {
      const { painterName, painterMobile, painterPlace } = req.body;
  
      const queryText = 'INSERT INTO Painter (PainterName, Mobile, Place) VALUES ($1, $2, $3)';
      const values = [painterName, painterMobile, painterPlace];
  
      await pool.query(queryText, values);
  
      res.status(201).json({ message: 'Painter data saved successfully' });
    } catch (error) {
      console.error('Error saving Painter data:', error);
      res.status(500).json({ error: 'Failed to save Painter data' });
    }
  });

// Endpoint to handle GET requests for fetching dealers
app.get('http://127.0.0.1:5432/api/getDealerNames', async (req, res) => {
    try {
      const queryText = 'SELECT * FROM Dealer';
      const result = await pool.query(queryText);
      const dealers = result.rows;
  
      res.json({ dealers });
    } catch (error) {
      console.error('Error fetching dealers:', error);
      res.status(500).json({ error: 'Failed to fetch dealers' });
    }
  });
  

// Endpoint to handle GET requests for fetching painters
app.get('/api/getPainters', async (req, res) => {
    try {
      const queryText = 'SELECT * FROM Painter';
      const result = await pool.query(queryText);
      const painters = result.rows;
  
      res.json({ painters });
    } catch (error) {
      console.error('Error fetching painters:', error);
      res.status(500).json({ error: 'Failed to fetch painters' });
    }
  });
  

// Endpoint to get the list of dealer names
app.get('/api/getDealerNames', async (req, res) => {
    try {
      const queryText = 'SELECT DISTINCT "DealerName" FROM "Dealer"';
      const result = await pool.query(queryText);
  
      const dealerNames = result.rows.map(record => record.DealerName);
  
      res.json({ dealerNames });
    } catch (error) {
      console.error('Error fetching dealer names:', error);
      res.status(500).json({ error: 'Failed to fetch dealer names' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});