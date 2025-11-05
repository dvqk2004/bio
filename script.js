document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if ((e.ctrlKey && e.key === 's') || (e.ctrlKey && e.key === 'u')) e.preventDefault();
});
if(window.location.hostname !== "qkhanh.bio"){
  document.body.innerHTML = "<h1>Unauthorized Copy Detected</h1>";
}
// ===== TikTok API (Free Unofficial) =====
// ⚠️ Thay "qkhanhnee" bằng username TikTok của bạn
// === TikTok Stats Auto Update + Neon Counter Animation ===
// Thay "qkhanhnee" bằng username TikTok thật của bạn
// === TikTok Stats Auto Update (dùng TikWM API) ===
const TIKTOK_USERNAME = "dvqk4";

async function fetchTikTokStats() {
  try {
    const response = await fetch(`https://www.tikwm.com/api/user/info?unique_id=${TIKTOK_USERNAME}`);
    const data = await response.json();

    if (data && data.data && data.data.user) {
      const user = data.data.user;

      // Hiển thị followers và hearts
      document.getElementById("tiktok-followers").textContent =
        user.follower_count.toLocaleString();
      document.getElementById("tiktok-likes").textContent =
        user.total_favorited.toLocaleString();
    } else {
      console.warn("Không lấy được dữ liệu TikTok:", data);
    }
  } catch (err) {
    console.error("Lỗi khi gọi API TikTok:", err);
  }
}

fetchTikTokStats();
setInterval(fetchTikTokStats, 10 * 60 * 1000);
