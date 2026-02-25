import { useEffect, useState } from "react";
import { Card, GText, STitle, Ring } from "../components/UI"; 
import { PRAYERS, QUOTES } from "../constants"; 
import { useUser } from "../context/UserContext";

export default function Dashboard({ dark, goals, prayers, setPrayers, juz }) {
  const { user } = useUser();
  const [ramadanInfo, setRamadanInfo] = useState({ day: "4", month: "رمضان" });
  const [prayerTimes, setPrayerTimes] = useState(null);

  const translations = {
    ar: {
      welcome: `السلام عليكم يا ${user.name} ✨`,
      status: `اليوم ${ramadanInfo.day} من شهر ${ramadanInfo.month}`,
      progressTitle: "تقدم رمضان",
      complete: "اكتمل",
      started: "بدأ 1 مارس",
      daysLeft: "أيام متبقية",
      prayerTitle: "مواقيت الصلاة",
      completionTitle: "إنجاز اليوم",
      stats: { prayers: "الصلوات", juz: "الأجزاء", goals: "الأهداف", habits: "العادات" },
      today: "اليوم"
    },
    en: {
      welcome: `Assalamu Alaikum, ${user.name} ✨`,
      status: `Day ${ramadanInfo.day} of ${ramadanInfo.month}`,
      progressTitle: "RAMADAN PROGRESS",
      complete: "Complete",
      started: "Started Mar 1",
      daysLeft: "days left",
      prayerTitle: "PRAYER TIMES",
      completionTitle: "TODAY'S COMPLETION",
      stats: { prayers: "Prayers", juz: "Juz", goals: "Goals", habits: "Habits" },
      today: "today"
    }
  };

  const t = translations[user.language || 'ar'];

  useEffect(() => {
    fetch(`https://api.aladhan.com/v1/gToH?date=22-02-2026`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const hijri = data.data.hijri;
          setRamadanInfo({
            day: hijri.day,
            month: user.language === "ar" ? hijri.month.ar : hijri.month.en
          });
        }
      })
      .catch(err => console.error("Error fetching Hijri date:", err));

    const calcMethod = user.country === "Egypt" ? 5 : 8;
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${user.country}&country=${user.country}&method=${calcMethod}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setPrayerTimes(data.data.timings);
      })
      .catch(err => console.error("Error fetching prayers:", err));
  }, [user.country, user.language]);

  const pCount = Object.values(prayers).filter(Boolean).length;
  const gCount = goals.filter((g) => g.done).length;
  const jCount = juz.filter(Boolean).length;
  const dailyProgress = Math.round(((pCount + gCount) / (5 + (goals.length || 1))) * 100);

  const prayerMap = {
    ar: { Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء" },
    en: { Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" }
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px", 
      animation: "fadeUp 0.6s ease-out", 
      direction: user.language === 'ar' ? 'rtl' : 'ltr',
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "10px",
      boxSizing: "border-box"
    }}>
      
      {/* Welcome Header */}
      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <GText size={window.innerWidth < 480 ? 24 : 32}>{t.welcome}</GText>
        <div style={{ fontSize: "14px", opacity: 0.7, marginTop: "8px", fontWeight: "600" }}>
          {t.status} — Ramadan Kareem! 🌙
        </div>
      </div>

      {/* Ramadan Progress Card */}
      <Card dark={dark} style={{ padding: "20px", border: "1px solid rgba(201,162,39,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "1px", opacity: 0.5 }}>{t.progressTitle}</div>
            <GText size={window.innerWidth < 480 ? 22 : 28}>{user.language === 'ar' ? `يوم ${ramadanInfo.day} / 30` : `DAY ${ramadanInfo.day} / 30`}</GText>
          </div>
          <div style={{ textAlign: user.language === 'ar' ? "left" : "right" }}>
            <div style={{ fontSize: "10px", opacity: 0.5 }}>{t.complete}</div>
            <GText size={22}>{Math.round((parseInt(ramadanInfo.day)/30)*100)}%</GText>
          </div>
        </div>
        <div style={{ height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ width: `${(parseInt(ramadanInfo.day)/30)*100}%`, height: "100%", background: "linear-gradient(90deg, #c9a227, #f5e56b)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", opacity: 0.4, marginTop: "10px" }}>
          <span>{t.started}</span>
          <span>{30 - parseInt(ramadanInfo.day)} {t.daysLeft}</span>
        </div>
      </Card>

      {/* Prayer Times Card */}
      <Card dark={dark} style={{ padding: "15px" }}>
        <STitle>{t.prayerTitle}</STitle>
        {prayerTimes ? (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))", 
            gap: "8px", 
            marginTop: "10px" 
          }}>
            {Object.keys(prayerMap.en).map(pKey => (
              <div key={pKey} style={{ textAlign: "center", padding: "8px 4px", background: "rgba(201,162,39,0.05)", borderRadius: "10px" }}>
                <div style={{ color: "#c9a227", fontSize: "10px", fontWeight: "bold" }}>{prayerMap[user.language][pKey]}</div>
                <div style={{ fontSize: "12px", marginTop: "4px", fontWeight: "600" }}>{prayerTimes[pKey]}</div>
              </div>
            ))}
          </div>
        ) : <div style={{ textAlign: "center", opacity: 0.5, padding: "10px" }}>Loading...</div>}
      </Card>

      {/* Stats Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: window.innerWidth < 600 ? "repeat(2, 1fr)" : "repeat(4, 1fr)", 
        gap: "12px" 
      }}>
        {[
          { icon: "🕌", val: `${pCount}/5`, label: t.stats.prayers },
          { icon: "📖", val: `${jCount}/30`, label: t.stats.juz },
          { icon: "🎯", val: `${gCount}/${goals.length}`, label: t.stats.goals },
          { icon: "🔥", val: "0/3", label: t.stats.habits },
        ].map((item, idx) => (
          <Card key={idx} dark={dark} style={{ textAlign: "center", padding: "15px 5px" }}>
            <div style={{ fontSize: "20px", marginBottom: "5px" }}>{item.icon}</div>
            <GText size={18}>{item.val}</GText>
            <div style={{ fontSize: "10px", opacity: 0.5, marginTop: "2px" }}>{item.label}</div>
          </Card>
        ))}
      </div>

      {/* Daily Completion Card */}
      <Card dark={dark} style={{ padding: "20px" }}>
        <STitle>{t.completionTitle}</STitle>
        <div style={{ 
          display: "flex", 
          flexDirection: window.innerWidth < 480 ? "column" : "row",
          alignItems: "center", 
          gap: "20px", 
          marginTop: "15px" 
        }}>
          <Ring pct={dailyProgress} size={100} label={`${dailyProgress}%`} sub={t.today} dark={dark} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
             <ProgressBar label={t.stats.prayers} val={pCount} max={5} />
             <ProgressBar label={t.stats.goals} val={gCount} max={goals.length} />
          </div>
        </div>
      </Card>
    </div>
  );
}

const ProgressBar = ({ label, val, max }) => (
  <div style={{ width: "100%" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
      <span style={{ opacity: 0.7 }}>{label}</span>
      <span style={{ fontWeight: "700" }}>{val}/{max}</span>
    </div>
    <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "10px" }}>
      <div style={{ width: `${(val / (max || 1)) * 100}%`, height: "100%", background: "#c9a227", borderRadius: "10px" }} />
    </div>
  </div>
);