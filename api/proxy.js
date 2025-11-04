export default async function handler(req, res) {
  const query = req.query.q || ""; // tham số client gửi lên
  const API_KEY = process.env.MY_API_KEY; // ẩn trong server

  try {
    const r = await fetch(`https://api.example.com/search?q=${query}`, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
      },
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
