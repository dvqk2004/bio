// api/tiktok.js
// ✅ Lấy dữ liệu TikTok an toàn bằng TikWM API (không bị chặn)

export default async function handler(req, res) {
  const username = (req.query.username || "dvqk4").replace(/^@/, "");
  const apiUrl = `https://www.tikwm.com/api/user/info?unique_id=${encodeURIComponent(username)}`;

  try {
    const r = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    const data = await r.json();

    if (!data || !data.data) {
      return res.status(502).json({ error: "Không thể lấy dữ liệu từ TikWM" });
    }

    const user = data.data;

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=59");
    res.setHeader("Content-Type", "application/json");

    return res.status(200).json({
      username: user.unique_id,
      nickname: user.nickname,
      followers: user.follower_count,
      hearts: user.total_favorited,
      following: user.following_count,
      avatar: user.avatar,
      updated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Lỗi khi fetch TikTok:", error);
    return res.status(500).json({
      error: "Lỗi server khi lấy dữ liệu TikTok",
      detail: error.message,
    });
  }
}
