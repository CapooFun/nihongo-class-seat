(function () {
  const PERIOD_TEXT = "9:00-12:30";
  const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];
  const calWidget = document.getElementById("calendar-widget");
  const calTitle = document.getElementById("cal-title");
  const calGridWrap = document.getElementById("cal-grid-wrap");
  const calGrid = document.getElementById("cal-grid");
  const calPrev = document.getElementById("cal-prev");
  const calNext = document.getElementById("cal-next");
  const calToggle = document.getElementById("cal-toggle");
  const weekLabel = document.getElementById("week-label");
  const scheduleGrid = document.getElementById("schedule-grid");
  const seatGrid = document.getElementById("seat-grid");
  const modalRoot = document.getElementById("modal-root");
  const currentSeatLayout = SEAT_MAP.layout;

  let activeModal = null;
  let calYear;
  let calMonth;
  let calExpanded = false;

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
            ${teacherItems.trim() ? `<div class="profile-grid">${teacherItems}</div>` : ""}
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
            ${createInfoItem("出身地", profile.hometown || "未入力")}
            ${createInfoItem("連絡先", profile.contact || "未入力")}
            ${createInfoItem("趣味", profile.hobby)}
          </div>
        </div>
      </div>
    `;
  }

  function renderCalendar(year, month, today) {
    calTitle.textContent = `${year}年${month + 1}月`;

    const firstDay = new Date(year, month, 1);
    let startDow = firstDay.getDay();
    if (startDow === 0) startDow = 7;
    const offset = startDow - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const cells = [];
    const totalCells = Math.ceil((offset + daysInMonth) / 7) * 7;
    let todayRowIndex = 0;

    for (let i = 0; i < totalCells; i++) {
      let dayNum, dateObj, isOtherMonth;

      if (i < offset) {
        dayNum = daysInPrev - offset + 1 + i;
        dateObj = new Date(year, month - 1, dayNum);
        isOtherMonth = true;
      } else if (i >= offset + daysInMonth) {
        dayNum = i - offset - daysInMonth + 1;
        dateObj = new Date(year, month + 1, dayNum);
        isOtherMonth = true;
      } else {
        dayNum = i - offset + 1;
        dateObj = new Date(year, month, dayNum);
        isOtherMonth = false;
      }

      const dow = dateObj.getDay();
      const isWeekend = dow === 0 || dow === 6;
      const holidayName = getHolidayName(dateObj);
      const isToday = isSameDay(dateObj, today);
      const isClassday = !isWeekend && !holidayName;

      if (isToday) {
        todayRowIndex = Math.floor(i / 7);
      }

      const classes = ["cal-cell"];
      if (isOtherMonth) classes.push("other-month");
      if (isWeekend) classes.push("is-weekend");
      if (holidayName) classes.push("is-holiday");
      if (isToday) classes.push("is-today");
      if (isClassday && !isOtherMonth) classes.push("is-classday");

      const title = holidayName && !isOtherMonth ? holidayName : "";

      cells.push(`<span class="${classes.join(" ")}"${title ? ` title="${escapeHtml(title)}"` : ""}>${dayNum}</span>`);
    }

    calGrid.innerHTML = cells.join("");
    applyCalendarCollapse(todayRowIndex);
  }

  function applyCalendarCollapse(todayRowIndex) {
    requestAnimationFrame(() => {
      const firstCell = calGrid.querySelector(".cal-cell");
      if (!firstCell) return;

      const cellHeight = firstCell.offsetHeight;
      const gridStyle = getComputedStyle(calGrid);
      const gap = parseFloat(gridStyle.rowGap) || 4;
      const padBottom = parseFloat(gridStyle.paddingBottom) || 0;
      const rowHeight = cellHeight + gap;
      const totalRows = Math.ceil(calGrid.children.length / 7);
      const fullHeight = totalRows * rowHeight - gap + padBottom;

      if (calExpanded) {
        calGridWrap.style.maxHeight = `${fullHeight}px`;
        calGrid.style.transform = "";
      } else {
        calGridWrap.style.maxHeight = `${rowHeight + padBottom}px`;
        calGrid.style.transform = `translateY(-${todayRowIndex * rowHeight}px)`;
      }
    });
  }

  function toggleCalendar(today) {
    calExpanded = !calExpanded;
    calWidget.classList.toggle("is-expanded", calExpanded);
    renderCalendar(calYear, calMonth, today);
  }

  function navigateCalendar(direction, today) {
    calMonth += direction;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar(calYear, calMonth, today);
  }

  function renderSchedule(schedule) {
    weekLabel.textContent = schedule.weekLabel;
    weekLabel.style.display = "inline";

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
            <div class="schedule-period">${escapeHtml(day.period || "")}</div>
            ${day.reason ? `<div class="schedule-note">${escapeHtml(day.reason)}</div>` : ""}
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
              <span class="seat-content">
                <span class="seat-position">${escapeHtml(seatLabel)}</span>
                <span class="seat-mid"><span class="seat-empty-label">空席</span></span>
                <span class="seat-name"></span>
              </span>
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
              <span class="seat-content">
                <span class="seat-position">${escapeHtml(seatLabel)}</span>
                <span class="seat-mid"><span class="seat-empty-label">空席</span></span>
                <span class="seat-name"></span>
              </span>
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
            <span class="seat-content">
              <span class="seat-position">${escapeHtml(seatLabel)}</span>
              <span class="seat-mid">${(() => {
                const reading = student.nameReading || "";
                const match = reading.match(/^(.+?)\s*(さん)$/);
                if (match) {
                  return `<span class="seat-reading">${escapeHtml(match[1])}</span><span class="seat-honorific">${escapeHtml(match[2])}</span>`;
                }
                return `<span class="seat-reading">${escapeHtml(reading)}</span>`;
              })()}</span>
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

    calYear = today.getFullYear();
    calMonth = today.getMonth();
    renderCalendar(calYear, calMonth, today);

    calToggle.addEventListener("click", () => toggleCalendar(today));
    calPrev.addEventListener("click", () => navigateCalendar(-1, today));
    calNext.addEventListener("click", () => navigateCalendar(1, today));

    renderSchedule(weekSchedule);
    renderSeatMap();
    bindEvents();
  }

  init();
})();
