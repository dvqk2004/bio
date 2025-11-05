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
// Client: gọi API serverless của bạn và animate số
const API_BASE = "/api/tiktok"; // nếu host khác, đổi thành full URL: https://bio-3gp5.vercel.app/api/tiktok
const TIKTOK_USERNAME = "dvqk4";

function animateNumber(el, target, duration = 1000) {
  const start = parseInt(el.textContent.replace(/\D/g, "")) || 0;
  const startTime = performance.now();
  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (target - start) * progress);
    el.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

async function loadTikTokToPage() {
  try {
    const res = await fetch(`${API_BASE}?username=${encodeURIComponent(TIKTOK_USERNAME)}`);
    if (!res.ok) {
      console.warn("API trả lỗi", res.status);
      return;
    }
    const data = await res.json();
    // nếu có dữ liệu
    if (data && typeof data.followers === "number") {
      const fEl = document.getElementById("tiktok-followers");
      const hEl = document.getElementById("tiktok-likes");
      if (fEl) animateNumber(fEl, data.followers, 1200);
      if (hEl) animateNumber(hEl, data.hearts || 0, 1200);
    } else {
      console.warn("Dữ liệu API không hợp lệ:", data);
    }
  } catch (e) {
    console.error("Lỗi khi gọi API TikTok (client):", e);
  }
}

// gọi khi load
document.addEventListener("DOMContentLoaded", () => {
  loadTikTokToPage();
  // cập nhật định kỳ (10 phút)
  setInterval(loadTikTokToPage, 10 * 60 * 1000);
});
