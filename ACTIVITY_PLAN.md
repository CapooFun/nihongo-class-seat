# 活动页面方案

> **文档目的**：供 AI 辅助实现时参考，描述活动页面的产品设计与技术实现方案。

---

## 背景与目标

当前网站是日语班的座位表与课程表工具。随着班级活动增多（如春季奥多摩远足），需要一个专属的活动页面，满足以下需求：

- 班主任（创建者）可以发布活动，包含行程、配图、费用等信息
- 地图直观展示目的地（强调视觉设计感）
- 同学可以在页面上报名参加；**全班汇总名单以 Google 表单为准**，页面报名列表为本机本地展示

**约束**：项目为纯静态前端（无服务器），需保持与现有网站一致的设计语言（深色 Aurora + 毛玻璃卡片）。

---

## 产品设计

### 页面入口

在 `index.html` 现有的三块区域（日历、课程表、座位表）下方，新增第四块：**「班级活动」**，用同款毛玻璃卡片展示活动列表。点击某个活动卡片，进入活动详情页（`activity.html`）。

### 活动详情页布局

```
┌─────────────────────────────────────────────┐
│  Hero Banner                                │  ← 全宽封面图 + 活动标题叠加
│  奥多摩ハイキング 🌿                         │
│  2026.05.16 ~ 05.17                         │
└─────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────────┐
│  活动介绍         │  │  地图                 │
│  （简介文字）     │  │  (Google Maps 嵌入)  │
│                  │  │  奥多摩駅 → 雲取山    │
└──────────────────┘  └──────────────────────┘

┌─────────────────────────────────────────────┐
│  行程安排（时间轴样式）                       │
│  Day 1  ·  Day 2  ·  ...                    │
│  [时间] [地点] [说明] + 配图                 │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  活动相册（Grid 瀑布流）                      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  报名区域                                    │
│  已报名：小池先生 / 朱福庆 / ...（头像列）    │
│  [我要报名] 按钮 → 填写姓名确认               │
└─────────────────────────────────────────────┘
```

---

## 数据结构

在 `js/data.js` 新增 `ACTIVITIES` 数组。每次有新活动，直接向此数组追加一条记录。

```javascript
const ACTIVITIES = [
  {
    id: "okutama-2026-05",
    title: "奥多摩ハイキング",
    titleReading: "おくたまはいきんぐ",
    subtitle: "東京の秘境で自然を満喫しよう！",
    coverImage: "img/activities/okutama-cover.jpg",  // 封面图（可为空字符串则用渐变占位）
    date: "2026-05-16",
    dateEnd: "2026-05-17",                           // 单日活动则与 date 相同
    location: "東京都西多摩郡奥多摩町",
    mapQuery: "奥多摩駅,東京都",                      // Google Maps 搜索词，用于生成嵌入 URL
    mapEmbed: "https://www.google.com/maps/embed?pb=...", // 可选：直接粘贴 Google Maps 嵌入代码
    fee: "約 ¥3,000（交通費+昼食）",
    capacity: 20,              // 可选，第一期不做「已满」拦截逻辑，仅展示
    description: "東京都内で一番の渓谷美を誇る奥多摩へ！...",
    tags: ["自然", "ハイキング", "一泊"],
    itinerary: [
      {
        day: 1,
        date: "2026-05-16",
        items: [
          { time: "08:30", place: "立川駅 集合",       note: "青梅線に乗り換え",  image: "" },
          { time: "10:00", place: "奥多摩駅 到着",     note: "荷物をロッカーへ",  image: "" },
          { time: "10:30", place: "鳩ノ巣渓谷 散策",   note: "約3km、2時間コース", image: "img/activities/okutama-1.jpg" },
          { time: "13:00", place: "奥多摩食堂 昼食",   note: "鹿肉バーガーが名物", image: "" },
          { time: "15:00", place: "奥多摩湖 展望",     note: "ダム湖と山の絶景",  image: "img/activities/okutama-2.jpg" },
          { time: "17:00", place: "もえぎの湯 温泉",   note: "登山後の疲れを癒す", image: "" },
          { time: "19:00", place: "民宿チェックイン",   note: "夕食付き",          image: "" }
        ]
      },
      {
        day: 2,
        date: "2026-05-17",
        items: [
          { time: "07:00", place: "朝食・出発準備",    note: "",                  image: "" },
          { time: "08:30", place: "日原鍾乳洞 見学",   note: "関東最大級の鍾乳洞", image: "img/activities/okutama-3.jpg" },
          { time: "11:30", place: "奥多摩駅 解散",     note: "お疲れさまでした！", image: "" }
        ]
      }
    ],
    gallery: [
      "img/activities/okutama-gallery-1.jpg",
      "img/activities/okutama-gallery-2.jpg"
    ],
    // ❌ 不写 signups 字段——报名数据唯一来源是 localStorage，见下方
  }
];
```

> **约定**：`data.js` 里不保留 `signups` 字段，避免与 localStorage 产生两处数据源冲突。渲染时始终从 localStorage 读取。

### 报名数据（localStorage）

报名信息保存在浏览器本地，key 为 `nihongo-activity-signups-{activityId}`，值为：

```json
[
  { "name": "朱福庆", "nameReading": "Shu Fukukei", "signedAt": "2026-04-20T10:30:00" }
]
```

> **局限说明**：localStorage 仅存本机，不同设备无法同步。页面报名列表仅为「本机备忘/视觉展示」，**真正的全班汇总名单以 Google 表单为准**。实现时在报名按钮旁附上 Google 表单链接。

---

## 技术实现

### 新增文件

| 文件 | 说明 |
|---|---|
| `activity.html` | 活动详情页 |
| `js/activity.js` | 详情页逻辑（行程渲染、地图、报名） |
| `css/activity.css` | 详情页专属样式（Hero、时间轴等） |
| `img/activities/` | 活动图片目录 |

### 修改文件

| 文件 | 改动 |
|---|---|
| `js/data.js` | 追加 `ACTIVITIES` 数组 |
| `index.html` | 新增「班级活动」区块，渲染活动列表卡片 |
| `js/app.js` | 新增 `renderActivities()` 函数 |
| `css/style.css` | 新增活动列表卡片样式（复用现有变量） |

### 地图方案

**推荐（零配置）：直接粘贴官方 iframe**
在 Google Maps 网页找到目的地 → 分享 → 嵌入地图 → 复制 `<iframe>` 代码，填入 `mapEmbed` 字段，实现时直接 `innerHTML` 注入即可。无需 API Key，无需注册，不会遇到配额问题。

**备选：Leaflet.js + OpenStreetMap**（完全免费、无需任何 Key，CDN 引入即用）——当 `mapEmbed` 为空时自动降级，用 `mapQuery` 字段拼接 OSM 搜索链接展示。

> ⚠️ 不使用 `Maps Embed API v1/place?key=...` 路径——该模式仍需在 Google Cloud 配置真实 Key，并非免费占位符。

### 行程时间轴样式

使用纯 CSS 竖向时间轴：左侧时间，中间带圆点的竖线，右侧内容卡片。与现有毛玻璃卡片风格统一，发光圆点颜色用 `--accent`（冰蓝）。

---

## 设计规范（与现有风格一致）

| 元素 | 规范 |
|---|---|
| 背景 | 复用 `--bg-deep` + Aurora 动画球 |
| 卡片 | `backdrop-filter: blur(24px)`，边框 `rgba(124,199,255,0.15)` |
| 强调色 | `--accent: #7cc7ff`（冰蓝）用于时间轴线、标签 |
| 次强调 | `--accent-secondary: #a78bfa`（紫）用于 Day 标签 |
| 暖色 | `--accent-warm: #ffd666`（暖黄）用于费用、标签 |
| 圆角 | 大卡片 `20px`，小元素 `12px` |
| 动画 | 入场 stagger（与 app.js 现有逻辑一致） |

---

## 活动管理（创建/编辑）

**初期方案**：直接编辑 `js/data.js` 的 `ACTIVITIES` 数组，每次新活动手动追加。这对班主任（即开发者本人）最简单，无需额外管理后台。

**后续可选**：在活动详情页添加「管理员模式」，通过本地密码解锁后可在浏览器内编辑活动信息并导出 JSON，再复制回 data.js。

---

## 验证方式

1. 在 `data.js` 中填入奥多摩活动数据，启动本地服务（`npx serve .` 或 VS Code Live Server）
2. 打开 `index.html`，确认「班级活动」区块出现奥多摩活动卡片
3. 点击卡片，跳转 `activity.html?id=okutama-2026-05`
4. 检查 Hero Banner、地图嵌入（需网络）、行程时间轴逐条展示
5. 点击「我要报名」，填写姓名，确认头像出现在已报名列表
6. 刷新页面，确认报名记录通过 localStorage 持久化
7. 在手机浏览器访问，检查响应式布局

---

## 里程碑

| # | 任务 | 说明 |
|---|---|---|
| 1 | 数据结构 | `data.js` 追加 `ACTIVITIES`，填入奥多摩示例数据 |
| 2 | 首页入口 | `index.html` + `app.js` 渲染活动列表卡片 |
| 3 | 详情页骨架 | `activity.html` + `activity.css`，Hero + 基础布局 |
| 4 | 地图集成 | 优先 `mapEmbed` iframe 直注入；为空时降级 Leaflet+OSM，响应式处理 |
| 5 | 行程时间轴 | CSS 时间轴 + 图片懒加载 |
| 6 | 报名功能 | 弹窗输入姓名，localStorage 存储，头像列表展示 |
| 7 | 相册模块 | Grid 布局 + 点击放大预览 |
| 8 | 响应式调整 | 手机端适配，断点与现有一致（680px / 480px） |
