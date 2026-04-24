(function () {
  const listEl = document.getElementById("activity-list");
  if (!listEl || !Array.isArray(ACTIVITIES) || ACTIVITIES.length === 0) return;

  function formatDateRange(dateStr, dateEndStr) {
    const start = new Date(dateStr + "T00:00:00");
    const end = new Date(dateEndStr + "T00:00:00");
    const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
    const fmt = (d) =>
      `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${WEEKDAYS[d.getDay()]}）`;
    if (dateStr === dateEndStr) return fmt(start);
    return `${fmt(start)} 〜 ${fmt(end)}`;
  }

  function escHtml(v) {
    return String(v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function getSignupCount(id) {
    try {
      const raw = localStorage.getItem(ACTIVITY_SIGNUPS_STORAGE_PREFIX + id);
      if (!raw) {
        return 0;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch (e) {
      return 0;
    }
  }

  const html = ACTIVITIES.map((act, i) => {
    const delay = (i * 0.08).toFixed(2);
    const count = getSignupCount(act.id);
    const tagsHtml = act.tags
      .map((t) => `<span class="act-tag">${escHtml(t)}</span>`)
      .join("");

    const heroStyle = act.coverImage
      ? `background-image:url(${escHtml(act.coverImage)});background-size:cover;background-position:center`
      : `background:${act.coverGradient || "linear-gradient(135deg,#1a3a2a,#0d2233)"}`;

    return `
      <a class="act-card fade-in-up" href="activity.html?id=${escHtml(act.id)}" style="--delay:${delay}s" aria-label="${escHtml(act.title)}">
        <div class="act-hero" style="${heroStyle}">
          ${act.coverEmoji ? `<span class="act-hero-emoji" aria-hidden="true">${act.coverEmoji}</span>` : ""}
          <div class="act-hero-overlay"></div>
          <div class="act-hero-meta">
            <span class="act-date-chip">${escHtml(formatDateRange(act.date, act.dateEnd))}</span>
          </div>
        </div>
        <div class="act-body">
          <div class="act-title-row">
            <div>
              <p class="act-title">${escHtml(act.title)}</p>
              <p class="act-reading">${escHtml(act.titleReading)}</p>
            </div>
            <span class="act-signup-badge">${count > 0 ? `${count}人参加` : "参加者募集中"}</span>
          </div>
          <p class="act-subtitle">${escHtml(act.subtitle)}</p>
          <div class="act-tags">${tagsHtml}</div>
          <div class="act-footer-row">
            <span class="act-location">📍 ${escHtml(act.location)}</span>
            <span class="act-cta">詳細を見る →</span>
          </div>
        </div>
      </a>
    `;
  }).join("");

  listEl.innerHTML = html;
})();
