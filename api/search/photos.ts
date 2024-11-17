export default async function handler(req, res) {
  const { query, page = 1, perPage = 20 } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing 'query' parameter" });
  }

  try {
    const UNSPLASH_API_BASE = "https://api.unsplash.com";
    const accessKey = process.env.UNSPLASH_API_KEY; // Use an environment variable for security

    const response = await fetch(
      `${UNSPLASH_API_BASE}/search/photos?query=${query}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Unsplash data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
