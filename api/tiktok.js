// api/tiktok.js
// Vercel Serverless function — scrape TikTok profile và trả JSON { username, followers, hearts, following, updated_at }
// GHI CHÚ: scraping có thể bị TikTok thay đổi / rate-limit. Set cache header để giảm số lần gọi.

export default async function handler(req, res) {
  const username = (req.query.username || req.query.user || "dvqk4").replace(/^@/, "");
  const profileUrl = `https://www.tiktok.com/@${encodeURIComponent(username)}`;

  try {
    // fetch trang profile (server-side avoids CORS)
    const r = await fetch(profileUrl, {
      headers: {
        // user-agent giả browser giúp giảm khả năng bị chặn
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!r.ok) {
      return res.status(502).json({ error: "Không thể tải trang TikTok", status: r.status });
    }

    const html = await r.text();

    // 1) Thử regex đơn giản (thường đúng)
    let follower_count = null;
    let heart_count = null;
    let following_count = null;

    const m1 = html.match(/"followerCount":\s*(\d+)/);
    const m2 = html.match(/"heartCount":\s*(\d+)/);
    const m3 = html.match(/"followingCount":\s*(\d+)/);

    if (m1) follower_count = parseInt(m1[1], 10);
    if (m2) heart_count = parseInt(m2[1], 10);
    if (m3) following_count = parseInt(m3[1], 10);

    // 2) Fallback: try extract JSON from window['SIGI_STATE'] or <script id="SIGI_STATE">
    if ((follower_count === null || heart_count === null) ) {
      // try to find window['SIGI_STATE'] = {...};
      const sigiMatch = html.match(/window\['SIGI_STATE'\]\s*=\s*({[\s\S]*?});\s*<\/script>/)
        || html.match(/<script id="SIGI_STATE" type="application\/json">([\s\S]*?)<\/script>/);

      if (sigiMatch) {
        try {
          const jsonText = sigiMatch[1] || sigiMatch[0];
          const parsed = JSON.parse(sigiMatch[1] || sigiMatch[0]);
          // different possible paths — try to locate user data
          // common path: parsed.UserModule.users[username] or parsed.UserModule.users[uniqueId]
          const users = (parsed && (parsed.UserModule && parsed.UserModule.users)) || null;
          if (users) {
            const ukeys = Object.keys(users);
            // find the one that matches username if possible
            const userKey = ukeys.find(k => k.toLowerCase().includes(username.toLowerCase())) || ukeys[0];
            const u = users[userKey];
            if (u) {
              if (u.followerCount != null) follower_count = parseInt_
