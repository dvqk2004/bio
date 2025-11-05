export default async function handler(req, res) {
  const username = req.query.username || "dvqk4";
  try {
    const html = await fetch(`https://www.tiktok.com/@${username}`).then(r => r.text());
    const followersMatch = html.match(/"followerCount":(\d+)/);
    const heartsMatch = html.match(/"heartCount":(\d+)/);
    const followingMatch = html.match(/"followingCount":(\d+)/);
    res.json({
      username,
      followers: followersMatch ? parseInt(followersMatch[1]) : 0,
      hearts: heartsMatch ? parseInt(heartsMatch[1]) : 0,
      following: followingMatch ? parseInt(followingMatch[1]) : 0
    });
  } catch (err) {
    res.status(500).json({ error: "Không thể lấy dữ liệu TikTok" });
  }
}
