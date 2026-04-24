(function () {
  const root = document.getElementById("act-detail-root");
  const FLUENT_3D_BASE = "https://registry.npmmirror.com/@lobehub/fluent-emoji-3d/latest/files/assets";

  function esc(v) {
    return String(v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function getActivityId() {
    const params = new URLSearchParams(location.search);
    return params.get("id") || "";
  }

  function storageKey(id) {
    return ACTIVITY_SIGNUPS_STORAGE_PREFIX + id;
  }

  function loadSignups(id) {
    try {
      const raw = localStorage.getItem(storageKey(id));
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveSignups(id, list) {
    try {
      const json = JSON.stringify(list);
      localStorage.setItem(storageKey(id), json);
      const roundTrip = localStorage.getItem(storageKey(id));
      return roundTrip === json;
    } catch (e) {
      return false;
    }
  }

  function formatDateRange(dateStr, dateEndStr) {
    const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
    const start = new Date(dateStr + "T00:00:00");
    const end = new Date(dateEndStr + "T00:00:00");
    const fmt = (d) =>
      `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${WEEKDAYS[d.getDay()]}）`;
    return dateStr === dateEndStr ? fmt(start) : `${fmt(start)} 〜 ${fmt(end)}`;
  }

  function renderSignupOfficialLead(act) {
    const lines = Array.isArray(act.signupGoogleFormRosterLines) ? act.signupGoogleFormRosterLines : [];
    const rosterHtml =
      lines.length > 0
        ? `<ul class="act-signup-roster-ul">${lines.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>`
        : "";
    return `
      <div class="act-signup-official-box">
        <p class="act-signup-lead">名前を選んで「参加登録」を押すと、クラスの集計シートに記録されます。</p>
        ${
          lines.length > 0
            ? `<details class="act-signup-roster-details"><summary>声かけ済み・参加予定（${lines.length}名・座席）</summary>${rosterHtml}</details>`
            : ""
        }
      </div>
    `;
  }

  function renderSignupList(act, signups, container) {
    if (signups.length === 0) {
      container.innerHTML = `<p class="act-signup-empty">まだ参加者がいません。最初に申し込もう！</p>`;
      return;
    }
    container.innerHTML = signups.map((s) => {
      const student = STUDENTS[s.key];
      const avatarSrc = student ? student.avatar : "";
      const displayName = student ? student.name : esc(s.name);
      return `
        <div class="act-signup-person">
          ${avatarSrc
            ? `<img class="act-signup-avatar" src="${esc(avatarSrc)}" alt="" loading="lazy">`
            : `<span class="act-signup-avatar" style="background:rgba(124,199,255,0.15);display:flex;align-items:center;justify-content:center;font-size:0.9rem;">👤</span>`
          }
          <span class="act-signup-name">${esc(displayName)}</span>
        </div>
      `;
    }).join("");
  }

  function isSelfSignedUp(signups) {
    try {
      const key = localStorage.getItem("nihongo-my-student-key");
      if (key) return signups.some((s) => s.key === key);
    } catch (e) {}
    return false;
  }

  function renderSignupButton(act, signups, actionsEl, listEl) {
    const alreadySigned = isSelfSignedUp(signups);

    if (alreadySigned) {
      actionsEl.innerHTML = `<span class="act-btn-signed">✓ 参加登録済み（このブラウザ）</span>`;
      return;
    }

    actionsEl.innerHTML = `
      <button class="act-btn-primary" type="button" id="signup-btn">参加登録する</button>
    `;

    document.getElementById("signup-btn").addEventListener("click", () => {
      showSignupModal(act, signups, listEl, actionsEl);
    });
  }

  function showSignupModal(act, signups, listEl, actionsEl) {
    const allMembers = [
      ...Object.entries(STUDENTS).map(([key, s]) => ({ key, name: s.name, type: "student" })),
    ];

    const overlay = document.createElement("div");
    overlay.className = "signup-modal-overlay";

    const optionsHtml = allMembers
      .map((m) => `<option value="${esc(m.key)}">${esc(m.name)}</option>`)
      .join("");

    overlay.innerHTML = `
      <div class="signup-modal-card">
        <p class="signup-modal-title">参加申し込み</p>
        <p class="signup-modal-sub">${esc(act.title)} に参加します</p>
        <p class="signup-modal-hint">※ 名前はこの端末にも保存されます。「申し込む」を押すとクラスの集計シートにも記録されます。</p>
        <label class="signup-select-label" for="signup-select">あなたの名前を選んでください</label>
        <select class="signup-select" id="signup-select">
          <option value="">── 選んでください ──</option>
          ${optionsHtml}
        </select>
        <div class="signup-modal-btns">
          <button class="signup-btn-cancel" id="signup-cancel">キャンセル</button>
          <button class="signup-btn-confirm" id="signup-confirm">申し込む</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector("#signup-cancel").addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });

    overlay.querySelector("#signup-confirm").addEventListener("click", () => {
      const select = overlay.querySelector("#signup-select");
      const selectedKey = select.value;
      if (!selectedKey) {
        select.style.borderColor = "var(--danger)";
        return;
      }

      const alreadyIn = signups.some((s) => s.key === selectedKey);
      if (!alreadyIn) {
        const student = STUDENTS[selectedKey];
        const entry = {
          key: selectedKey,
          name: student ? student.name : selectedKey,
          signedAt: new Date().toISOString()
        };
        signups.push(entry);
        const saved = saveSignups(act.id, signups);
        if (!saved) {
          signups.pop();
          window.alert(
            "保存に失敗しました（ストレージが無効・容量不足など）。\nプライベート／シークレットモードを解除するか、別ブラウザでお試しください。\n\n未能写入本机存储，请关闭无痕模式或更换浏览器后再报名。"
          );
          return;
        }

        // 集計シートへ送信（fire-and-forget）
        if (typeof SIGNUP_WEBAPP_URL === "string" && SIGNUP_WEBAPP_URL) {
          fetch(SIGNUP_WEBAPP_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              activityId:    act.id,
              activityTitle: act.title,
              studentName:   entry.name,
              studentKey:    entry.key,
              timestamp:     entry.signedAt
            })
          }).catch(() => {});
        }
      }

      try {
        localStorage.setItem("nihongo-my-student-key", selectedKey);
      } catch (e) {
        // 「自分」表示用のみ。本体の参加リストは上で保存済み
      }

      overlay.remove();
      renderSignupList(act, signups, listEl);
      renderSignupButton(act, signups, actionsEl, listEl);
    });
  }

  function renderRouteSection(route) {
    const highlightsHtml = route.highlights.map((h) => `
      <div class="act-route-highlight">
        <div class="act-route-highlight-img-wrap">
          <img src="${esc(h.image)}" alt="${esc(h.name)}" loading="lazy" class="act-route-highlight-img">
        </div>
        <div class="act-route-highlight-body">
          <p class="act-route-highlight-name">${esc(h.name)}</p>
          <p class="act-route-highlight-note">${esc(h.note)}</p>
        </div>
      </div>
    `).join("");

    return `
      <div class="act-section act-route-section fade-in-up" style="--delay:0.18s">
        <p class="act-section-title">HIKING ROUTE ─ 徒歩コース</p>
        <div class="act-route-map-wrap">
          <img src="${esc(route.mapImage)}" alt="ハイキングコースマップ" loading="lazy" class="act-route-map-img">
          <p class="act-route-map-caption">${esc(route.mapCaption)}</p>
        </div>
        <div class="act-route-highlights">${highlightsHtml}</div>
      </div>
    `;
  }

  function renderPage(act) {
    // 动态标题：初级1A - X月X日 - XXX活动
    const startDate = new Date(act.date + "T00:00:00");
    const monthDay = `${startDate.getMonth() + 1}月${startDate.getDate()}日`;
    document.title = `初级1A - ${monthDay} - ${act.title}活动`;

    const heroStyle = act.coverImage
      ? `background-image:url(${esc(act.coverImage)});background-size:cover;background-position:center`
      : `background:${act.coverGradient || "linear-gradient(135deg,#1a3a2a,#0d2233)"}`;

    const tagsHtml = act.tags
      .map((t) => `<span class="act-tag">${esc(t)}</span>`)
      .join("");

    const timelineHtml = act.itinerary.map((item, i) => `
      <div class="act-tl-item" style="--delay:${(i * 0.04).toFixed(2)}s">
        <div class="act-tl-time">${esc(item.time)}</div>
        <div class="act-tl-dot-col"><div class="act-tl-dot"></div></div>
        <div class="act-tl-card">
          <p class="act-tl-place">${esc(item.place)}</p>
          ${item.note ? `<p class="act-tl-note">${esc(item.note)}</p>` : ""}
          ${item.image ? `<img class="act-tl-img" src="${esc(item.image)}" alt="${esc(item.place)}" loading="lazy">` : ""}
        </div>
      </div>
    `).join("");

    root.innerHTML = `
      <!-- Hero -->
      <div class="act-detail-hero fade-in-up">
        <div class="act-detail-hero-bg" style="${heroStyle}"></div>
        ${act.coverEmoji ? `<span class="act-detail-hero-emoji" aria-hidden="true">${act.coverEmoji}</span>` : ""}
        <div class="act-detail-hero-overlay"></div>
        <div class="act-detail-hero-content">
          <h1 class="act-detail-title">${esc(act.title)}</h1>
          <p class="act-detail-subtitle">${esc(act.subtitle)}</p>
        </div>
      </div>

      <!-- Tags -->
      <div class="act-detail-tags fade-in-up" style="--delay:0.05s">${tagsHtml}</div>

      <!-- Info chips -->
      <div class="act-info-chips fade-in-up" style="--delay:0.1s">
        <div class="act-info-chip">
          <span class="act-info-chip-icon">📅</span>
          <div><span class="act-info-chip-label">日程</span><span class="act-info-chip-value">${esc(formatDateRange(act.date, act.dateEnd))}</span></div>
        </div>
        <div class="act-info-chip">
          <span class="act-info-chip-icon">📍</span>
          <div><span class="act-info-chip-label">場所</span><span class="act-info-chip-value">${esc(act.location)}</span></div>
        </div>
        <div class="act-info-chip">
          <span class="act-info-chip-icon">🚉</span>
          <div><span class="act-info-chip-label">集合</span><span class="act-info-chip-value">${esc(act.meetingPoint)}</span></div>
        </div>
        <div class="act-info-chip">
          <span class="act-info-chip-icon">💴</span>
          <div><span class="act-info-chip-label">費用</span><span class="act-info-chip-value">${esc(act.fee)}</span></div>
        </div>
      </div>

      <!-- Description + Map -->
      <div class="act-two-col fade-in-up" style="--delay:0.15s">
        <div class="act-section">
          <p class="act-section-title">ABOUT</p>
          <p class="act-description">${esc(act.description)}</p>
        </div>
        <div class="act-section act-map-section">
          <iframe
            class="act-map-frame"
            src="${esc(act.mapEmbed)}"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="活動場所の地図"
          ></iframe>
        </div>
      </div>

      ${act.route ? renderRouteSection(act.route) : ""}

      <!-- Timeline -->
      <div class="act-section act-timeline-section fade-in-up" style="--delay:0.2s">
        <p class="act-section-title">ITINERARY ─ 行程</p>
        <div class="act-timeline" id="act-timeline">${timelineHtml}</div>
      </div>

      <!-- Signup -->
      <div class="act-section act-signup-section fade-in-up" style="--delay:0.25s">
        <p class="act-section-title">SIGNUP ─ 参加申し込み</p>
        ${renderSignupOfficialLead(act)}
        <div id="signup-list" class="act-signup-list"></div>
        <div id="signup-actions" class="act-signup-actions"></div>
      </div>
    `;

    const signups = loadSignups(act.id);
    const listEl = document.getElementById("signup-list");
    const actionsEl = document.getElementById("signup-actions");
    renderSignupList(act, signups, listEl);
    renderSignupButton(act, signups, actionsEl, listEl);
  }

  function renderNotFound() {
    root.innerHTML = `
      <div style="text-align:center;padding:80px 20px;color:var(--text-secondary)">
        <p style="font-size:3rem">🌿</p>
        <p>活動が見つかりませんでした。</p>
        <a href="index.html" style="color:var(--accent)">← クラスページへ戻る</a>
      </div>
    `;
  }

  const id = getActivityId();
  const act = (ACTIVITIES || []).find((a) => a.id === id);

  if (act) {
    renderPage(act);
  } else {
    renderNotFound();
  }
})();
