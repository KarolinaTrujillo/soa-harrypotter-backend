require('dotenv').config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "https://soa-harrypotter-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
  
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

app.get("/characters", async (req, res) => {
  try {

    const apiUrl = process.env.HARRY_POTTER_API || "https://hp-api.onrender.com/api";
    
    const response = await axios.get(`${apiUrl}/characters`);
    res.json(response.data);
  } catch (error) {
    console.error("Error en la petición a la API:", error.message);
    res.status(500).json({ 
      message: "Error consuming Harry Potter API",
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});