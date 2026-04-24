const FLUENT_3D = "https://registry.npmmirror.com/@lobehub/fluent-emoji-3d/latest/files/assets";

const TEACHERS = {
  koike: {
    name: "小池先生",
    nameReading: "こいけ せんせい",
    avatar: `${FLUENT_3D}/1f43c.webp`,
    note: "日本語を教えるのが好き",
    background: "経済学関連のバックグラウンド（学校名は未確認）"
  },
  tomitaTeacher: {
    name: "富田先生",
    nameReading: "とみた せんせい",
    avatar: `${FLUENT_3D}/1f98a.webp`
  },
  tsuchiya: {
    name: "土谷先生",
    nameReading: "つちや せんせい",
    avatar: `${FLUENT_3D}/1f43b.webp`
  },
  ishii: {
    name: "石井先生",
    nameReading: "いしい せんせい",
    avatar: `${FLUENT_3D}/1f430.webp`
  },
  umetsu: {
    name: "梅津先生",
    nameReading: "うめつ せんせい",
    avatar: `${FLUENT_3D}/1f431.webp`,
    hobby: "料理が好き"
  },
  kurosawa: {
    name: "黑泽先生",
    nameReading: "くろさわ せんせい",
    avatar: `${FLUENT_3D}/1f43f.webp`
  }
};

const WEEKDAY_TEACHERS = ["koike", "tomitaTeacher", "tsuchiya", "kurosawa", "umetsu"];

const JAPAN_HOLIDAYS_2026 = {
  "2026-01-01": "元日",
  "2026-01-12": "成人の日",
  "2026-02-11": "建国記念の日",
  "2026-02-23": "天皇誕生日",
  "2026-03-20": "春分の日",
  "2026-04-29": "昭和の日",
  "2026-05-03": "憲法記念日",
  "2026-05-04": "みどりの日",
  "2026-05-05": "こどもの日",
  "2026-05-06": "振替休日",
  "2026-07-20": "海の日",
  "2026-08-11": "山の日",
  "2026-09-21": "敬老の日",
  "2026-09-22": "国民の休日",
  "2026-09-23": "秋分の日",
  "2026-10-12": "スポーツの日",
  "2026-11-03": "文化の日",
  "2026-11-23": "勤労感謝の日"
};

const NO_SEAT = "__NO_SEAT__";
const EMPTY_SEAT = "__EMPTY__";

/** クラス活動の参加申し込み一覧（閲覧者のブラウザ localStorage のみ）。key = 接頭辞 + ACTIVITIES[].id */
const ACTIVITY_SIGNUPS_STORAGE_PREFIX = "nihongo-activity-signups-";

const STUDENTS = {
  shuFukukei: {
    name: "朱福庆",
    nameReading: "Shu Fukukei さん",
    realName: "朱福庆",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f425.webp`
  },
  kiUtetsu: {
    name: "喜宇哲",
    nameReading: "Ki Utetsu さん",
    realName: "喜宇哲",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f981.webp`
  },
  chinTaku: {
    name: "陈卓",
    nameReading: "Chin Taku さん",
    realName: "陈卓",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f43c.webp`
  },
  youKokugen: {
    name: "姚皓严",
    nameReading: "You Kougen さん",
    realName: "姚皓严",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f42f.webp`
  },
  souKyou: {
    name: "宋强",
    nameReading: "Sou Kyou さん",
    realName: "宋强",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f402.webp`
  },
  roSekishou: {
    name: "卢石祥",
    nameReading: "Ro Sekishou さん",
    realName: "卢石祥",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f427.webp`
  },
  mouSeki: {
    name: "孟硕",
    nameReading: "Mou Seki さん",
    realName: "孟硕",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f428.webp`
  },
  chouShoken: {
    name: "张书剑",
    nameReading: "Chou Shoken さん",
    realName: "张书剑",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f436.webp`
  },
  kouU: {
    name: "黄宇",
    nameReading: "Kou U さん",
    realName: "黄宇",
    nationality: "🇨🇳 中国",
    hometown: "四川",
    contact: "WeChat: Capoo-fun",
    hobby: "ゲーム・読書・ゲーム制作",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f424.webp`
  },
  teiMokugan: {
    name: "丁默含",
    nameReading: "Tei Mokugan さん",
    realName: "丁默含",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f43b-200d-2744-fe0f.webp`
  },
  chouMuyou: {
    name: "张梦阳",
    nameReading: "Chou Muyou さん",
    realName: "张梦阳",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f43a.webp`
  },
  shuuRyousyou: {
    name: "周凌宵",
    nameReading: "Shuu Ryousyou さん",
    realName: "周凌宵",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f439.webp`
  },
  chinGyou: {
    name: "陈垚",
    nameReading: "Chin Gyou さん",
    realName: "陈垚",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f989.webp`
  },
  enSongai: {
    name: "袁存凯",
    nameReading: "En Songai さん",
    realName: "袁存凯",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f98a.webp`
  },
  giHouen: {
    name: "魏鹏远",
    nameReading: "Gi Houen さん",
    realName: "魏鹏远",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f985.webp`
  },
  touGyokuken: {
    name: "唐玉涓",
    nameReading: "Tou Gyokuken さん",
    realName: "唐玉涓",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f63a.webp`
  },
  kaGyokuken: {
    name: "夏玉娟",
    nameReading: "Ka Gyokuken さん",
    realName: "夏玉娟",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f430.webp`
  },
  youItukin: {
    name: "姚韦昕",
    nameReading: "You Itukin さん",
    realName: "姚韦昕",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f438.webp`
  },
  inKanro: {
    name: "尹寒璐",
    nameReading: "In Kanro さん",
    realName: "尹寒璐",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f984.webp`
  },
  tsutsumiEri: {
    name: "堤惠里",
    nameReading: "Tsutsumi Eri さん",
    realName: "堤惠里",
    nationality: "🇯🇵 日本",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "教师助教",
    avatar: `${FLUENT_3D}/1f431.webp`
  },
  chiUkin: {
    name: "戚宇馨",
    nameReading: "Chi Ukin さん",
    realName: "戚宇馨",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f467.webp`
  },
  youKenhei: {
    name: "余健平",
    nameReading: "You Kenhei さん",
    realName: "余健平",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f466.webp`
  },
  jdnchxna: {
    name: "jdnchxna",
    nameReading: "jdnchxna さん",
    realName: "jdnchxna",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f464.webp`
  },
  kouLi: {
    name: "黄鹂",
    nameReading: "Huang Li さん",
    realName: "黄鹂",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f426.webp`
  },
  teiShinyou: {
    name: "丁昕瑶",
    nameReading: "Ding Xinyao さん",
    realName: "丁昕瑶",
    nationality: "🇨🇳 中国",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "待补充",
    avatar: `${FLUENT_3D}/1f3a8.webp`
  }
};

const ACTIVITIES = [
  {
    id: "okutama-2026-04-30",
    title: "奥多摩ハイキング",
    titleReading: "おくたまはいきんぐ",
    subtitle: "黄金週間前夜・新緑の渓谷と湖を歩こう！",
    coverImage: "https://res.cloudinary.com/jnto/image/upload/w_2064,h_1300,c_fill,f_auto,fl_lossy,q_auto/v1513938752/tokyo/Tokyo2368_3",
    coverGradient: "linear-gradient(135deg, #1a3a2a 0%, #0d2233 50%, #1a2a3a 100%)",
    coverEmoji: "",
    date: "2026-04-30",
    dateEnd: "2026-04-30",
    location: "東京都西多摩郡奥多摩町",
    meetingPoint: "高円寺駅（JR中央線）改札前",
    mapEmbed: "https://maps.google.com/maps?q=%E5%A5%A5%E5%A4%9A%E6%91%A9%E9%A7%85%2C%E6%9D%B1%E4%BA%AC%E9%83%BD%E8%A5%BF%E5%A4%9A%E6%91%A9%E9%83%A1%E5%A5%A5%E5%A4%9A%E6%91%A9%E7%94%BA&output=embed&hl=ja",
    fee: "交通費 約 ¥1,500（往復）+ 昼食・温泉は各自",
    capacity: 25,
    tags: ["自然", "ハイキング", "日帰り", "新緑"],
    description: "4月30日（木）、いよいよ明日からGW！その前夜に東京都内とは思えない大自然・奥多摩へ出発。\n4月末の奥多摩は新緑がもっとも美しい季節。鳩ノ巣渓谷の吊り橋と清流、奥多摩湖のパノラマ絶景、帰りに温泉で締める最高の一日を。\n高円寺から約2時間、クラスのみんなで思い出を作ろう！",
    route: {
      mapImage: "https://www.okutama.gr.jp/site/map/image/hikawa.png",
      mapCaption: "出典：奥多摩観光協会 公式ハイキングマップ（氷川エリア）",
      highlights: [
        {
          name: "鳩ノ巣渓谷 吊り橋",
          image: "https://www.ohtama.or.jp/wp-content/uploads/2020/03/sightseeing_pic097_01.jpg",
          note: "渓谷を渡る絶景スポット。高さ約30mの吊り橋から清流を見下ろす"
        },
        {
          name: "鳩ノ巣渓谷 清流",
          image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Hatonosu_Gorge_20240518.jpg",
          note: "多摩川上流の清流と巨岩。エメラルドグリーンの流れが美しい"
        },
        {
          name: "奥多摩湖・麦山浮橋",
          image: "https://res.cloudinary.com/jnto/image/upload/w_2064,h_1300,c_fill,f_auto,fl_lossy,q_auto/v1513935204/tokyo/Tokyo2367_1",
          note: "全長320mの浮き橋を渡る体験。足元の揺れがクセになる"
        }
      ]
    },
    itinerary: [
      { time: "08:00", place: "高円寺駅 集合・出発", note: "JR中央線 改札前に集合。立川行きで出発！", image: "" },
      { time: "08:35", place: "立川駅 乗り換え", note: "青梅線ホームへ移動。鳩ノ巣行き（青梅線）に乗車", image: "" },
      { time: "09:55", place: "鳩ノ巣駅 下車", note: "ハイキングの出発点。奥多摩駅の2つ手前で下車", image: "" },
      { time: "10:10", place: "鳩ノ巣渓谷 入口", note: "遊歩道スタート。整備された渓谷沿いの道を歩く", image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Hatonosu_Valley_%40_Otama_Walking_Trail_%2810756155063%29.jpg" },
      { time: "10:40", place: "鳩ノ巣吊り橋", note: "高さ約30m！渓谷を一望する絶景スポット。写真スポット必至", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/Tama_river_%40_Hatonosu_Valley_%40_Otama_Walking_Trail_%2810755941846%29.jpg" },
      { time: "11:30", place: "白丸湖・数馬の切り通し", note: "神秘的な紺碧の湖と江戸時代の石切り遺構", image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Otama_Walking_Trail_%40_From_Hatonosu_to_Mount_Mitake_%2810756156363%29.jpg" },
      { time: "12:30", place: "昼食タイム（奥多摩駅周辺）", note: "「玉川屋」の奥多摩そば or 持参弁当で渓谷ランチ", image: "" },
      { time: "14:00", place: "奥多摩湖・麦山浮橋", note: "バスで10分。空汽油桶で支えられた全長320mの浮き橋を渡る。足元が揺れる不思議な体験！", image: "https://res.cloudinary.com/jnto/image/upload/w_2064,h_1300,c_fill,f_auto,fl_lossy,q_auto/v1513935204/tokyo/Tokyo2367_1" },
      { time: "15:30", place: "もえぎの湯（希望者）", note: "奥多摩駅徒歩10分。渓谷を望む露天風呂の天然温泉（¥900）", image: "https://www.okutamas.co.jp/moegi/wp-content/themes/okutama/dist/images/top/guide/guide-img2.jpg" },
      { time: "17:30", place: "奥多摩駅 出発・帰路", note: "青梅線→中央線で帰路へ", image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Okutama_Station_Gate.jpg" },
      { time: "19:30", place: "高円寺駅 解散（予定）", note: "お疲れさまでした！打ち上げ希望者は駅前で🍻", image: "" }
    ],
    gallery: [],
    signupFormUrl: ""
  }
];

/* 4 列：左から列ごとの席数 6, 7, 7, 7。グリッド上は 7 行で、第 1 列の最下行は隙間用（黒板側揃いの座席 6 席） */
const SEAT_MAP = {
  colHeights: [6, 7, 7, 7],
  layout: [
    ["roSekishou", "kiUtetsu", "youItukin", EMPTY_SEAT, "giHouen", "chiUkin"],
    ["chinGyou", "shuFukukei", "teiMokugan", "teiShinyou", "shuuRyousyou", "kouLi", "jdnchxna"],
    ["souKyou", "touGyokuken", "inKanro", "tsutsumiEri", "chinTaku", "chouShoken", "youKenhei"],
    ["youKokugen", "kouU", "enSongai", "kaGyokuken", "chouMuyou", "mouSeki", EMPTY_SEAT]
  ]
};
