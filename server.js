require('dotenv').config()

const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:3000"
  ]
}))

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(`${process.env.HARRY_POTTER_API}/characters`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: "Error consuming Harry Potter API" })
  }
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
