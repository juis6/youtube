import "dotenv/config"
import express from "express"
import morgan from "morgan"

import { YoutubeApiService } from "./services/youtube-api.js"

const PORT = process.env.PORT

const app = express()

app.use(morgan("tiny"))
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello world"
    })
})

app.get("/health", (req, res) => {
    res.status(200).json({
        status: true,
        timestamp: Date()
    })
})

app.get("/youtube-api/search", async (req, res) => {
    try {
        const result = await YoutubeApiService.search(req.query)
        res.status(200).json(result)
    } catch (err) {
        console.error("Search endpoint error:", err)
        res.status(500).json({ error: err.message })
    }
})

app.use((req, res) => {
    res.status(404).json({
        msg: "Endpoint not found"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
