import "dotenv/config"

const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST
const SEARCH_URL = process.env.SEARCH_URL

class YoutubeApiService {
    static async search(args) {
        try {
            const defaults = {
                q: "",
                part: "snippet",
                regionCode: "US",
                maxResults: 12,
                order: "date"
            }
            const params = new URLSearchParams({ ...defaults, ...args })

            const url = `${SEARCH_URL}?${params.toString()}`
            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key": X_RAPIDAPI_KEY,
                    "x-rapidapi-host": X_RAPIDAPI_HOST
                }
            }

            const response = await fetch(url, options)

            return response
        } catch (err) {
            console.error("Search API error:", err.message)
            return null
        }
    }
}

export { YoutubeApiService }
