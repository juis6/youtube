class YoutubeApiSerializer {
    static serializeSearchItem(item) {
        try {
            return {
                videoId: item.id?.videoId || null,
                title: item.snippet?.title || null,
                description: item.snippet?.description || null,
                publishedAt: item.snippet?.publishedAt || null,
                thumbnailUrl:
                    item.snippet?.thumbnails?.high?.url ||
                    item.snippet?.thumbnails?.medium?.url ||
                    item.snippet?.thumbnails?.default?.url ||
                    null
            }
        } catch (err) {
            console.error("Search item serialization error:", err)
            return null
        }
    }

    static serializeSearchResult(data) {
        try {
            return {
                result: data.items?.map(item => this.serializeSearchItem(item)) || null,
                totalResults: data.pageInfo?.totalResults || null,
                nextPageToken: data.nextPageToken || null,
                prevPageToken: data.prevPageToken || null
            }
        } catch (err) {
            console.error("Search result serialization error:", err)
            return null
        }
    }
}

export { YoutubeApiSerializer }
