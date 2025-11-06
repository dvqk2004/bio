// 🚫 Chặn chuột phải và phím tắt
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if ((e.ctrlKey && e.key === 's') || (e.ctrlKey && e.key === 'u') || e.key === 'F12') e.preventDefault();
});
if (window.location.hostname !== "dvqk2004.github.io" && window.location.hostname !== "qkhanh.bio") {
  document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:50vh;'>Unauthorized Copy Detected</h1>";
}

// 🎵 Cấu hình TikTok
const TIKTOK_USERNAME = "dvqk4"; // 🔸 Tên TikTok của bạn (vd: dvqk4)
const API_URL = `https://tiktok-scraper7.p.rapidapi.com/user/info?unique_id=${TIKTOK_USERNAME}`;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'd4f67352f9mshe1bfeed8733aa64p1f5521jsnbac20444ea63', // 🔸 Thay bằng key của bạn
    'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com'
  }
};

// 🎇 Hiệu ứng đếm mượt
function animateNumber(el, target, duration = 1200) {
  if (!el) return;
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

// 🚀 Lấy dữ liệu TikTok
async function loadTikTokStats() {
  try {
    const res = await fetch(API_URL, API_OPTIONS);
    if (!res.ok) {
      console.warn("TikTok API trả lỗi HTTP:", res.status);
      return;
    }

    const data = await res.json();
    const user = data.userInfo;

    if (user && user.stats) {
      const followers = user.stats.followerCount;
      const hearts = user.stats.heartCount;

      const fEl = document.getElementById("tiktok-followers");
      const hEl = document.getElementById("tiktok-likes");

      animateNumber(fEl, followers);
      animateNumber(hEl, hearts);

      console.log("✅ Cập nhật TikTok thành công:", { followers, hearts });
    } else {
      console.warn("⚠️ Không tìm thấy dữ liệu TikTok:", data);
    }
  } catch (err) {
    console.error("❌ Lỗi khi gọi API TikTok:", err);
  }
}

// 🔁 Cập nhật định kỳ mỗi 10 phút
document.addEventListener("DOMContentLoaded", () => {
  loadTikTokStats();
  setInterval(loadTikTokStats, 10 * 60 * 1000);
});
const API_BASE = "https://dvqk2004.github.io/bio/"; // thay bằng domain Vercel của bạn
const TIKTOK_USERNAME = "dvqk4";

async function loadTikTokStats() {
  try {
    const res = await fetch(`${API_BASE}?username=${TIKTOK_USERNAME}`);
    const data = await res.json();

    if (data.followers) {
      document.getElementById("tiktok-followers").textContent = data.followers.toLocaleString();
      document.getElementById("tiktok-likes").textContent = data.hearts.toLocaleString();
      console.log("✅ Fetched from server:", data);
    } else {
      console.warn("⚠️ API không trả về followers/hearts:", data);
    }
  } catch (err) {
    console.error("❌ Lỗi khi fetch API:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadTikTokStats);

