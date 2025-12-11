import "dotenv/config"
import express from "express"
import morgan from "morgan"

import { YoutubeApiService } from "./services/youtube-api.js"
import { YoutubeApiSerializer } from "./serializers/youtube-api.js"

const PORT = process.env.PORT

const app = express()

app.use(morgan("tiny"))
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello world"
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
        const response = await YoutubeApiService.search(req.query)

        const data = await response.json()
        const serialized = YoutubeApiSerializer.serializeSearchResult(data)

        res.status(200).json(serialized)
    } catch (err) {
        console.error("Search endpoint error:", err.message)
        res.status(500).json({ error: err.message })
    }
})

app.use((req, res) => {
    res.status(404).json({
        error: "Endpoint not found"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
