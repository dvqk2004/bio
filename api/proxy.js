// api/proxy.js (Node)
export default async function handler(req, res) {
  const q = req.query.q || 'default';
  const KEY = process.env.MY_SECRET_KEY; // cấu hình trên Vercel Dashboard
  const url = `https://api.example.com/data?q=${encodeURIComponent(q)}&key=${KEY}`;
  const r = await fetch(url);
  const data = await r.json();
  res.status(200).json(data);
}
