document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if ((e.ctrlKey && e.key === 's') || (e.ctrlKey && e.key === 'u')) e.preventDefault();
});
if(window.location.hostname !== "https://dvqk2004.github.io/bio/"){
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
// TikTok client: call serverless API and animate numbers
const API_BASE = "/api/tiktok"; // nếu muốn full URL, replace by https://bio-3gp5.vercel.app/api/tiktok
const TIKTOK_USERNAME = "dvqk4"; // your TikTok ID

function animateNumber(el, target, duration = 1100) {
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

async function loadTikTokStats() {
  try {
    const res = await fetch(`${API_BASE}?username=${encodeURIComponent(TIKTOK_USERNAME)}`);
    if (!res.ok) {
      console.warn("TikTok API returned HTTP", res.status);
      return;
    }
    const data = await res.json();
    if (!data) {
      console.warn("TikTok API returned empty");
      return;
    }

    const followers = typeof data.followers === "number" ? data.followers : 0;
    const hearts = typeof data.hearts === "number" ? data.hearts : 0;

    const fEl = document.getElementById("tiktok-followers");
    const hEl = document.getElementById("tiktok-likes");

    // small fade-in for the stats container (if present)
    const statsContainer = document.querySelector(".stats");
    if (statsContainer) {
      statsContainer.classList.add("visible-from-bottom");
    }

    animateNumber(fEl, followers, 1200);
    animateNumber(hEl, hearts, 1200);

  } catch (e) {
    console.error("Error loading TikTok stats (client):", e);
  }
}
// === TikTok Stats Auto Update (RapidAPI) ===
const url = 'https://tiktok-scraper7.p.rapidapi.com/user/story?user_id=7357492073123087392'; // username TikTok
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'd4f67352f9mshe1bfeed8733aa64p1f5521jsnbac20444ea63', // 🔸 thay bằng key của bạn
    'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(data => {
    const user = data.userInfo;
    if (user && user.stats) {
      const followers = user.stats.followerCount;
      const hearts = user.stats.heartCount;

      document.getElementById("tiktok-followers").textContent = followers.toLocaleString();
      document.getElementById("tiktok-likes").textContent = hearts.toLocaleString();

      console.log("✅ TikTok stats loaded:", { followers, hearts });
    } else {
      console.warn("⚠️ Không tìm thấy dữ liệu user.stats:", data);
    }
  })
  .catch(err => console.error("❌ Lỗi khi lấy API TikTok:", err));





