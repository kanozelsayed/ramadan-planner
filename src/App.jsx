import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { STARS, NAV } from "./constants"; 
import { Card, GText, STitle, Ring } from "./components/UI"; 
import { useUser } from "./context/UserContext";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard"; 
import GoalsPage from "./pages/GoalsPage";
import StatsPage from "./pages/StatsPage";
import PrayerPage from "./pages/PrayerPage"; 
import QuranPage from "./pages/QuranPage"; 
import HabitsPage from "./pages/HabitsPage";
import ProfilePage from "./pages/ProfilePage";

export default function RamadanPlanner() {
  const { user } = useUser(); 
  const [tab, setTab] = useState("dashboard");
  const [dark, setDark] = useState(true);
  
  // ✨ 
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (user.isLoggedIn) {
      setTab("dashboard");
    }
  }, [user.isLoggedIn]);

  const menuTexts = {
    ar: { 
      dashboard: "الرئيسية", prayer: "الصلوات", quran: "القرآن", 
      goals: "الأهداف", habits: "العادات", stats: "الإحصائيات", profile: "الحساب" 
    },
    en: { 
      dashboard: "Dashboard", prayer: "Prayer", quran: "Quran", 
      goals: "Goals", habits: "Habits", stats: "Stats", profile: "Profile" 
    }
  };

  const tMenu = menuTexts[user.language || 'ar'];

  // --- States الأساسية ---
  const [goals, setGoals] = useState([
    { id: "1", text: "Read 2 pages Quran", cat: "Worship", done: false },
    { id: "2", text: "Give Sadaqah today", cat: "Charity", done: false },
    { id: "3", text: "Drink 8 cups of water", cat: "Health", done: false },
  ]);

  const [prayers, setPrayers] = useState({ 
    Fajr: false, Dhuhr: false, Asr: false, Maghrib: false, Isha: false 
  });

  const [juz, setJuz] = useState(Array(30).fill(false));

  const [habits, setHabits] = useState([
    { id: "1", name: "أذكار الصباح", icon: "🤲", done: false },
    { id: "2", name: "قراءة قبل النوم", icon: "📚", done: false },
  ]);

  const theme = {
    bgMain: dark ? "linear-gradient(135deg,#04041f 0%,#080830 55%,#0d0d45 100%)" : "#f0ebe0",
    txt: dark ? "#e8d5a3" : "#5d4d37",
    txtSub: dark ? "rgba(232,213,163,0.5)" : "rgba(93, 77, 55, 0.6)",
    sidebar: dark ? "rgba(4,4,31,0.95)" : "#ffffff",
    cardBorder: dark ? "rgba(201,162,39,0.1)" : "rgba(201,162,39,0.2)"
  };

  if (!user.isLoggedIn) {
    return <AuthPage />;
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: theme.bgMain, 
      color: theme.txt, 
      display: "flex", 
      flexDirection: user.language === 'ar' ? 'row-reverse' : 'row',
      direction: user.language === 'ar' ? 'rtl' : 'ltr',
      position: "relative", 
      overflow: "hidden",
      fontFamily: user.language === 'ar' ? "'Amiri', serif" : "'Raleway', sans-serif" 
    }}>
      
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 7000,
          style: {
            background: dark ? '#0d0d45' : '#fff',
            color: dark ? '#e8d5a3' : '#5d4d37',
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: '12px',
          }
        }}
      />

      {dark && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          {STARS.map((s) => (
            <div key={s.id} style={{
              position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
              width: s.size, height: s.size, borderRadius: "50%", background: "white",
              animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite alternate`,
              opacity: s.opacity,
            }} />
          ))}
        </div>
      )}

      {/* Sidebar المعدل - بياخد الـ width بناءً على الحالة */}
      <aside style={{ 
        width: isCollapsed ? 80 : 260, 
        zIndex: 10, background: theme.sidebar, backdropFilter: "blur(20px)", 
        borderLeft: user.language === 'ar' ? `1px solid ${theme.cardBorder}` : "none",
        borderRight: user.language !== 'ar' ? `1px solid ${theme.cardBorder}` : "none",
        display: "flex", flexDirection: "column", flexShrink: 0,
        transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative"
      }}>
        
        {/* زرار التصغير (Collapse Button) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            position: "absolute",
            top: "25px",
            [user.language === 'ar' ? 'left' : 'right']: "-15px",
            width: "30px", height: "30px", borderRadius: "50%",
            background: "#c9a227", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)", zIndex: 11
          }}
        >
          <span style={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s", color: "#000" }}>
            {user.language === 'ar' ? "›" : "‹"}
          </span>
        </button>

        {/* Profile Section */}
        <div onClick={() => setTab("profile")} style={{ padding: "40px 15px 30px", cursor: "pointer", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: isCollapsed ? "center" : "flex-start" }}>
             <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#c9a227", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold", flexShrink: 0 }}>
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
             </div>
             {!isCollapsed && (
               <div style={{ whiteSpace: "nowrap", animation: "fadeUp 0.3s" }}>
                 <GText size={18} bold>{user.name}</GText>
                 <div style={{ fontSize: "11px", color: theme.txtSub }}>{user.country}</div>
               </div>
             )}
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, padding: "0 15px" }}>
          {NAV.map((n) => (
            <button key={n.id} onClick={() => setTab(n.id)} 
              title={isCollapsed ? tMenu[n.id] : ""}
              style={{ 
                background: tab === n.id ? (dark ? "rgba(201,162,39,0.15)" : "rgba(201,162,39,0.08)") : "transparent", 
                color: tab === n.id ? "#c9a227" : theme.txt, 
                border: tab === n.id ? "1px solid #c9a227" : "1px solid transparent", 
                padding: "12px", 
                textAlign: isCollapsed ? "center" : (user.language === 'ar' ? "right" : "left"), 
                cursor: "pointer", borderRadius: "12px", display: "flex", 
                alignItems: "center", justifyContent: isCollapsed ? "center" : "flex-start",
                gap: isCollapsed ? 0 : "12px",
                fontWeight: tab === n.id ? "700" : "500", transition: "all 0.3s"
              }}>
              <span style={{ fontSize: "22px" }}>{n.icon}</span> 
              {!isCollapsed && <span style={{ whiteSpace: "nowrap", animation: "fadeUp 0.3s" }}>{tMenu[n.id]}</span>}
            </button>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div style={{ padding: "20px 15px", borderTop: `1px solid ${theme.cardBorder}` }}>
          <button onClick={() => setDark(!dark)}
            style={{ 
              width: "100%", padding: "12px", borderRadius: "12px", 
              background: dark ? "rgba(255,255,255,0.05)" : "#f5f5f5",
              border: "none", cursor: "pointer", color: theme.txt,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
            <span>{dark ? "☀️" : "🌙"}</span>
            {!isCollapsed && <span style={{ marginLeft: "10px" }}>{dark ? (user.language === 'ar' ? "فاتح" : "Light") : (user.language === 'ar' ? "داكن" : "Dark")}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content - بياخد المساحة الباقية أوتوماتيكياً */}
      <main style={{ flex: 1, height: "100vh", overflow: "hidden", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: isCollapsed ? "1350px" : "1200px", padding: "20px 40px", display: "flex", flexDirection: "column", gap: "15px", transition: "max-width 0.4s" }}>
          <div style={{ flex: 1, overflowY: "auto", paddingRight: "5px" }}>
            {tab === "dashboard" && <Dashboard dark={dark} goals={goals} prayers={prayers} setPrayers={setPrayers} juz={juz} />}
            {tab === "goals" && <GoalsPage goals={goals} setGoals={setGoals} txt={theme.txt} dark={dark} />}
            {tab === "prayer" && <PrayerPage prayers={prayers} setPrayers={setPrayers} dark={dark} />}
            {tab === "quran" && <QuranPage juz={juz} setJuz={setJuz} dark={dark} />}
            {tab === "habits" && <HabitsPage habits={habits} setHabits={setHabits} dark={dark} />}
            {tab === "profile" && <ProfilePage dark={dark} />}
            {tab === "stats" && (
              <StatsPage 
                dark={dark} 
                pCount={Object.values(prayers).filter(Boolean).length} 
                jCount={juz.filter(Boolean).length} 
                gCount={goals.filter(g => g.done).length} 
                hCount={habits.filter(h => h.done).length} 
              />
            )}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes twinkle{from{opacity:0.1;transform:scale(0.7)}to{opacity:1;transform:scale(1.3)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar { width: 0px; background: transparent; }
      `}</style>
    </div>
  );
}