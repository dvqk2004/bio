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
const TIKTOK_USERNAME = "qkhanhnee";

// Hàm hiệu ứng đếm số mượt
function animateNumber(el, target) {
  const duration = 1200; // 1.2 giây
  const start = parseInt(el.textContent.replace(/\D/g, "")) || 0;
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(start + (target - start) * progress);
    el.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Hàm lấy dữ liệu từ API
async function fetchTikTokStats() {
  try {
    const response = await fetch(`https://api.lovetik.com/api/user?username=${TIKTOK_USERNAME}`);
    const data = await response.json();

    if (data && data.data) {
      const user = data.data;

      const followersEl = document.getElementById("tiktok-followers");
      const likesEl = document.getElementById("tiktok-likes");

      animateNumber(followersEl, user.follower_count);
      animateNumber(likesEl, user.heart_count);
    } else {
      console.warn("Không lấy được dữ liệu TikTok:", data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API TikTok:", error);
  }
}

// Gọi ngay khi load trang
fetchTikTokStats();

// Cập nhật lại mỗi 10 phút
setInterval(fetchTikTokStats, 10 * 60 * 1000);
