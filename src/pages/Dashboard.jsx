import { useEffect, useState } from "react";
// تصحيح المسارات: نستخدم ./ للوصول للمجلدات من داخل src
import { Card, GText, STitle, Ring } from "../components/UI"; 
import { PRAYERS, QUOTES } from "../constants"; 
import { useUser } from "../context/UserContext";

export default function Dashboard({ dark, goals, prayers, setPrayers, juz }) {
  const { user } = useUser();
  const [ramadanInfo, setRamadanInfo] = useState({ day: "4", month: "رمضان" });
  const [prayerTimes, setPrayerTimes] = useState(null);

  // قاموس النصوص للترجمة بناءً على اختيار المستخدم
  const translations = {
    ar: {
      welcome: `السلام عليكم يا ${user.name} ✨`,
      status: `اليوم ${ramadanInfo.day} من شهر ${ramadanInfo.month}`,
      progressTitle: "تقدم رمضان",
      complete: "اكتمل",
      started: "بدأ 1 مارس",
      daysLeft: "أيام متبقية",
      prayerTitle: "مواقيت الصلاة الحقيقية",
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
      prayerTitle: "REAL-TIME PRAYER TIMES",
      completionTitle: "TODAY'S COMPLETION",
      stats: { prayers: "Prayers", juz: "Juz", goals: "Goals", habits: "Habits" },
      today: "today"
    }
  };

  const t = translations[user.language || 'ar'];

  useEffect(() => {
    // جلب التاريخ الهجري لليوم (22 فبراير 2026 يوافق 4 رمضان)
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

    // جلب مواقيت الصلاة: طريقة 5 لمصر وطريقة 8 لباقي العالم
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
  const dailyProgress = Math.round(((pCount + gCount) / (5 + goals.length)) * 100);

  const prayerMap = {
    ar: { Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء" },
    en: { Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeUp 0.6s ease-out", direction: user.language === 'ar' ? 'rtl' : 'ltr' }}>
      
      <div style={{ textAlign: "center" }}>
        <GText size={32}>{t.welcome}</GText>
        <div style={{ fontSize: "16px", opacity: 0.7, marginTop: "8px", fontWeight: "600" }}>
          {t.status} — Ramadan Kareem! 🌙
        </div>
      </div>

      <Card dark={dark} style={{ padding: "30px", border: "1px solid rgba(201,162,39,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "1.5px", opacity: 0.5 }}>{t.progressTitle}</div>
            <GText size={32}>{user.language === 'ar' ? `يوم ${ramadanInfo.day} / 30` : `DAY ${ramadanInfo.day} / 30`} 🌙</GText>
          </div>
          <div style={{ textAlign: user.language === 'ar' ? "left" : "right" }}>
            <div style={{ fontSize: "11px", opacity: 0.5 }}>{t.complete}</div>
            <GText size={26}>{Math.round((parseInt(ramadanInfo.day)/30)*100)}%</GText>
          </div>
        </div>
        <div style={{ height: "12px", background: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ width: `${(parseInt(ramadanInfo.day)/30)*100}%`, height: "100%", background: "linear-gradient(90deg, #c9a227, #f5e56b)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", opacity: 0.4, marginTop: "10px" }}>
          <span>{t.started}</span>
          <span>{30 - parseInt(ramadanInfo.day)} {t.daysLeft}</span>
        </div>
      </Card>

      <Card dark={dark}>
        <STitle>{t.prayerTitle}</STitle>
        {prayerTimes ? (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", gap: "10px" }}>
            {Object.keys(prayerMap.en).map(pKey => (
              <div key={pKey} style={{ flex: 1, textAlign: "center", padding: "10px", background: "rgba(201,162,39,0.05)", borderRadius: "12px" }}>
                <div style={{ color: "#c9a227", fontSize: "11px", fontWeight: "bold" }}>{prayerMap[user.language][pKey]}</div>
                <div style={{ fontSize: "13px", marginTop: "5px" }}>{prayerTimes[pKey]}</div>
              </div>
            ))}
          </div>
        ) : <div style={{ textAlign: "center", opacity: 0.5 }}>Loading...</div>}
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {[
          { icon: "🕌", val: `${pCount}/5`, label: t.stats.prayers },
          { icon: "📖", val: `${jCount}/30`, label: t.stats.juz },
          { icon: "🎯", val: `${gCount}/${goals.length}`, label: t.stats.goals },
          { icon: "🔥", val: "0/3", label: t.stats.habits },
        ].map((item, idx) => (
          <Card key={idx} dark={dark} style={{ textAlign: "center", padding: "20px 10px" }}>
            <div style={{ fontSize: "24px", marginBottom: "10px" }}>{item.icon}</div>
            <GText size={20}>{item.val}</GText>
            <div style={{ fontSize: "11px", opacity: 0.5 }}>{item.label}</div>
          </Card>
        ))}
      </div>

      <Card dark={dark} style={{ padding: "25px" }}>
        <STitle>{t.completionTitle}</STitle>
        <div style={{ display: "flex", alignItems: "center", gap: "40px", marginTop: "10px" }}>
          <Ring pct={dailyProgress} size={110} label={`${dailyProgress}%`} sub={t.today} dark={dark} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
             <ProgressBar label={t.stats.prayers} val={pCount} max={5} />
             <ProgressBar label={t.stats.goals} val={gCount} max={goals.length} />
          </div>
        </div>
      </Card>
    </div>
  );
}

const ProgressBar = ({ label, val, max }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
      <span style={{ opacity: 0.7 }}>{label}</span>
      <span style={{ fontWeight: "700" }}>{val}/{max}</span>
    </div>
    <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "10px" }}>
      <div style={{ width: `${(val / max) * 100}%`, height: "100%", background: "#c9a227", borderRadius: "10px" }} />
    </div>
  </div>
);