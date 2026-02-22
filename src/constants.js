// النجوم
export const STARS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.2 + 0.4,
  dur: (Math.random() * 3 + 2).toFixed(1),
  delay: (Math.random() * 5).toFixed(1),
  opacity: Math.random() * 0.6 + 0.4,
}));

// الصلوات
export const PRAYERS = [
  { name: "Fajr",    time: "04:12", ar: "الفجر",   icon: "🌅" },
  { name: "Dhuhr",   time: "12:05", ar: "الظهر",   icon: "☀️" },
  { name: "Asr",     time: "15:28", ar: "العصر",   icon: "🌤️" },
  { name: "Maghrib", time: "18:02", ar: "المغرب",  icon: "🌇" },
  { name: "Isha",    time: "19:30", ar: "العشاء",  icon: "🌙" },
];

// ألوان الأقسام (تأكدي أن الاسم CAT_COLORS بالظبط)
export const CAT_COLORS = { 
  Worship: "#c9a227", 
  Charity: "#4ade80", 
  Health: "#60a5fa", 
  Learning: "#f472b6", 
  Family: "#a78bfa", 
  Other: "#94a3b8" 
};

// القائمة
export const NAV = [
  { id: "dashboard", icon: "🏠", label: "Dashboard" },
  { id: "prayer",    icon: "🕌", label: "Prayer" },
  { id: "quran",     icon: "📖", label: "Quran" },
  { id: "goals",     icon: "🎯", label: "Goals" },
  { id: "habits",    icon: "🔥", label: "Habits" },
  { id: "stats",     icon: "📊", label: "Stats" },
];

// الاقتباسات
export const QUOTES = [
  { ar: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", en: "Indeed, Allah is with the patient.", ref: "2:153" },
];