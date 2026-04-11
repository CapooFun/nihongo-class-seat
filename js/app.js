(function () {
  const PERIOD_TEXT = "9:00-12:30";
  const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];
  const todayCard = document.getElementById("today-card");
  const weekLabel = document.getElementById("week-label");
  const scheduleGrid = document.getElementById("schedule-grid");
  const seatGrid = document.getElementById("seat-grid");
  const modalRoot = document.getElementById("modal-root");
  const currentSeatLayout = SEAT_MAP.layout;

  let activeModal = null;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function toISODate(date) {
    return [
      date.getFullYear(),
      pad(date.getMonth() + 1),
      pad(date.getDate())
    ].join("-");
  }

  function isSameDay(left, right) {
    return toISODate(left) === toISODate(right);
  }

  function formatJapaneseDate(date) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${WEEKDAY_LABELS[date.getDay()]}）`;
  }

  function formatMonthDay(date) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  function getMonday(referenceDate) {
    const date = new Date(referenceDate);
    const currentDay = date.getDay();
    const distance = currentDay === 0 ? -6 : 1 - currentDay;
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + distance);
    return date;
  }

  function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  function getHolidayName(date) {
    return JAPAN_HOLIDAYS_2026[toISODate(date)] || null;
  }

  function getClassInfo(date) {
    const day = date.getDay();
    const holidayName = getHolidayName(date);

    if (day === 0 || day === 6) {
      return {
        isOff: true,
        teacherKey: null,
        period: null,
        reason: "週末休み"
      };
    }

    if (holidayName) {
      return {
        isOff: true,
        teacherKey: null,
        period: null,
        reason: `祝日: ${holidayName}`
      };
    }

    return {
      isOff: false,
      teacherKey: WEEKDAY_TEACHERS[day - 1],
      period: PERIOD_TEXT,
      reason: null
    };
  }

  function buildWeekSchedule(referenceDate) {
    const monday = getMonday(referenceDate);
    const friday = addDays(monday, 4);
    const days = [];

    for (let index = 0; index < 5; index += 1) {
      const date = addDays(monday, index);
      const classInfo = getClassInfo(date);

      days.push({
        date,
        dateText: formatMonthDay(date),
        dayOfWeek: WEEKDAY_LABELS[date.getDay()],
        isToday: isSameDay(date, referenceDate),
        ...classInfo
      });
    }

    return {
      weekLabel: `${monday.getMonth() + 1}月${monday.getDate()}日〜${friday.getMonth() + 1}月${friday.getDate()}日`,
      days
    };
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function createInfoItem(label, value) {
    if (!value) {
      return "";
    }

    const normalizedValue =
      value === "未填写" || value === "待补充" ? "未入力" : value === "教师助教" ? "補助スタッフ" : value;

    return `
      <div class="profile-item">
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(normalizedValue)}</span>
      </div>
    `;
  }

  function openModal(type, key) {
    const profile = type === "teacher" ? TEACHERS[key] : STUDENTS[key];

    if (!profile) {
      return;
    }

    closeModal();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML = createModalMarkup(type, profile);

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay || event.target.closest(".modal-close")) {
        closeModal();
      }
    });

    document.addEventListener("keydown", handleEscape);
    modalRoot.appendChild(overlay);
    activeModal = overlay;
  }

  function closeModal() {
    if (!activeModal) {
      return;
    }

    activeModal.remove();
    activeModal = null;
    document.removeEventListener("keydown", handleEscape);
  }

  function handleEscape(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  function avatarMarkup(profile) {
    if (profile.avatar) {
      return `<img class="avatar-img" src="${escapeHtml(profile.avatar)}" alt="" loading="lazy">`;
    }
    return escapeHtml(profile.avatarEmoji || "🐣");
  }

  function createModalMarkup(type, profile) {
    if (type === "teacher") {
      const teacherItems = [
        createInfoItem("補足", profile.note),
        createInfoItem("背景", profile.background),
        createInfoItem("趣味", profile.hobby)
      ].join("");

      return `
        <div class="modal-card">
          <div class="modal-header">
            <div></div>
            <button class="modal-close" type="button" aria-label="閉じる">✕</button>
          </div>
          <div class="modal-body">
            <div class="profile-hero">
              <div class="avatar-badge" aria-hidden="true">${avatarMarkup(profile)}</div>
              <div>
                <div class="profile-name">${escapeHtml(profile.name)}</div>
                <div class="profile-reading">${escapeHtml(profile.nameReading)}</div>
              </div>
            </div>
            ${teacherItems ? `<div class="profile-grid">${teacherItems}</div>` : '<p class="profile-hint">この先生の補足情報はまだ未入力です。</p>'}
          </div>
        </div>
      `;
    }

    return `
      <div class="modal-card">
        <div class="modal-header">
          <div></div>
          <button class="modal-close" type="button" aria-label="閉じる">✕</button>
        </div>
        <div class="modal-body">
          <div class="profile-hero">
            <div class="avatar-badge" aria-hidden="true">${avatarMarkup(profile)}</div>
            <div>
              <div class="profile-name">${escapeHtml(profile.name)}</div>
              <div class="profile-reading">${escapeHtml(profile.nameReading)}</div>
              <div class="profile-subtitle">${escapeHtml(profile.nationality)}</div>
            </div>
          </div>
          <div class="profile-grid">
            ${createInfoItem("中国語名", profile.realName)}
            ${createInfoItem("JLPT", profile.jlptLevel)}
            ${createInfoItem("趣味", profile.hobby)}
            ${createInfoItem("出身地", profile.hometown || "未入力")}
          </div>
        </div>
      </div>
    `;
  }

  function renderToday(referenceDate, weekSchedule) {
    const classInfo = getClassInfo(referenceDate);
    const holidayName = getHolidayName(referenceDate);
    const todayTeacher = classInfo.teacherKey ? TEACHERS[classInfo.teacherKey] : null;
    const statusClass = classInfo.isOff ? "off" : "on";
    const statusText = classInfo.isOff ? "休み" : "授業日";
    const extraText = holidayName
      ? ` · ${holidayName}`
      : referenceDate.getDay() === 0 || referenceDate.getDay() === 6
        ? " · 週末"
        : ` · ${PERIOD_TEXT}`;

    todayCard.innerHTML = `
      <p class="today-date">${escapeHtml(formatJapaneseDate(referenceDate))}</p>
      <div class="today-meta">
        <span class="status-pill ${statusClass}">
          <span aria-hidden="true">${classInfo.isOff ? "🔴" : "🟢"}</span>
          ${statusText}${extraText}
        </span>
      </div>
      <div class="today-teacher">
        <span>今日の先生</span>
        ${
          todayTeacher
            ? `<button class="text-button" type="button" data-modal-type="teacher" data-modal-key="${escapeHtml(classInfo.teacherKey)}">${escapeHtml(todayTeacher.name)}</button>`
            : `<span>${escapeHtml(classInfo.reason || "休み")}</span>`
        }
      </div>
      <div class="today-teacher">
        <span>今週</span>
        <span>${escapeHtml(weekSchedule.weekLabel)}</span>
      </div>
    `;
  }

  function renderSchedule(schedule) {
    weekLabel.textContent = schedule.weekLabel;

    scheduleGrid.innerHTML = schedule.days
      .map((day, index) => {
        const teacher = day.teacherKey ? TEACHERS[day.teacherKey] : null;
        const classes = ["schedule-day"];

        if (day.isToday) {
          classes.push("is-today");
        }

        if (day.isOff) {
          classes.push("is-off");
        }

        const delay = (index * 0.08).toFixed(2);

        return `
          <article class="${classes.join(" ")}" style="--delay:${delay}s">
            <div class="schedule-head">
              <div class="schedule-day-name">${escapeHtml(day.dayOfWeek)}曜日</div>
              <div class="schedule-date">${escapeHtml(day.dateText)}</div>
            </div>
            <div class="schedule-teacher">
              ${
                teacher
                  ? `<button class="text-button" type="button" data-modal-type="teacher" data-modal-key="${escapeHtml(day.teacherKey)}">${escapeHtml(teacher.name)}</button>`
                  : "休み"
              }
            </div>
            <div class="schedule-period">${escapeHtml(day.period || "授業なし")}</div>
            <div class="schedule-note">${escapeHtml(day.reason || "通常授業")}</div>
          </article>
        `;
      })
      .join("");
  }

  function renderSeatMap() {
    seatGrid.style.setProperty("--seat-cols", String(SEAT_MAP.cols));

    seatGrid.innerHTML = currentSeatLayout
      .flat()
      .map((studentKey, index) => {
        const seatLabel = `${(index % SEAT_MAP.cols) + 1}-${Math.floor(index / SEAT_MAP.cols) + 1}`;
        const row = Math.floor(index / SEAT_MAP.cols);
        const col = index % SEAT_MAP.cols;
        const delay = ((row * 0.06) + (col * 0.03)).toFixed(2);

        if (studentKey === NO_SEAT) {
          return `<div class="seat-gap" aria-hidden="true"></div>`;
        }

        if (!studentKey || studentKey === EMPTY_SEAT) {
          return `
            <button
              class="seat is-empty-slot"
              type="button"
              disabled
              style="--delay:${delay}s"
              aria-label="空席 ${escapeHtml(seatLabel)}"
            >
              <span class="seat-position">${escapeHtml(seatLabel)}</span>
              <span class="seat-empty-label">空席</span>
            </button>
          `;
        }

        const student = STUDENTS[studentKey];

        if (!student) {
          return `
            <button
              class="seat is-empty-slot"
              type="button"
              disabled
              style="--delay:${delay}s"
              aria-label="空席 ${escapeHtml(seatLabel)}"
            >
              <span class="seat-position">${escapeHtml(seatLabel)}</span>
              <span class="seat-empty-label">空席</span>
            </button>
          `;
        }

        return `
          <button
            class="seat filled"
            type="button"
            style="--delay:${delay}s"
            data-modal-type="student"
            data-modal-key="${escapeHtml(studentKey)}"
            aria-label="${escapeHtml(student.name)} の情報を見る"
          >
            <span class="seat-position">${escapeHtml(seatLabel)}</span>
            <span class="seat-content">
              <span class="seat-reading">${escapeHtml(student.nameReading)}</span>
              <span class="seat-name">${escapeHtml(student.name)}</span>
            </span>
          </button>
        `;
      })
      .join("");
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-modal-type][data-modal-key]");

      if (!trigger) {
        return;
      }

      openModal(trigger.dataset.modalType, trigger.dataset.modalKey);
    });
  }

  function init() {
    const today = new Date();
    const weekSchedule = buildWeekSchedule(today);

    renderToday(today, weekSchedule);
    renderSchedule(weekSchedule);
    renderSeatMap();
    bindEvents();
  }

  init();
})();
