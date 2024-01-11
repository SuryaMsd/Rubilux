const express = require('express');
const app = express();
const sql = require('mssql');

app.use(express.json());

const config = {
    server: 'localhost\SQLEXPRESS', 
    database: 'rubilux',
    options: {
        encrypt: false // If you're using Azure, set to true
    }
};

// Endpoint to handle POST requests for creating a new dealer
app.post('/api/saveDealer', async (req, res) => {
    try {
        const { dealerName, dealerMobile, dealerPlace } = req.body;

        const pool = await sql.connect(config);

        await pool.request()
            .input('dealerName', sql.NVarChar, dealerName)
            .input('dealerMobile', sql.NVarChar, dealerMobile)
            .input('dealerPlace', sql.NVarChar, dealerPlace)
            .query('INSERT INTO Dealer (DealerName, Mobile, Place) VALUES (@dealerName, @dealerMobile, @dealerPlace)');

        res.status(201).json({ message: 'Dealer data saved successfully' });
    } catch (error) {
        console.error('Error saving Dealer data:', error);
        res.status(500).json({ error: 'Failed to save Dealer data' });
    }
});

// Similar endpoint for saving Painter data

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
