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
  }
};

const WEEKDAY_TEACHERS = ["koike", "tomitaTeacher", "tsuchiya", "ishii", "umetsu"];

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
    nameReading: "You Kokugen さん",
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
  tomitaAyaka: {
    name: "富田彩夏",
    nameReading: "Tomita Ayaka さん",
    realName: "富田彩夏",
    nationality: "🇯🇵 日本",
    hobby: "未填写",
    message: "よろしくお願いします！",
    jlptLevel: "教师助教",
    avatar: `${FLUENT_3D}/1f338.webp`
  }
};

const SEAT_MAP = {
  rows: 5,
  cols: 5,
  layout: [
    ["roSekishou", "touGyokuken", "chinGyou", "giHouen", "youKokugen"],
    [EMPTY_SEAT, "shuuRyousyou", "shuFukukei", "souKyou", "kouU"],
    [NO_SEAT, "youItukin", "inKanro", "kaGyokuken", "enSongai"],
    [NO_SEAT, "kiUtetsu", "tsutsumiEri", "mouSeki", "chinTaku"],
    [NO_SEAT, "tomitaAyaka", "teiMokugan", "chouMuyou", "chouShoken"]
  ]
};
