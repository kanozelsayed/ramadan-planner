import { Card, GText } from "../components/UI";
import { PRAYERS } from "../constants";

export default function PrayerPage({ prayers, setPrayers, dark }) {
  const pCount = Object.values(prayers).filter(Boolean).length;

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: 16,
      width: "100%",
      maxWidth: "500px", // مثالي جداً لشكل التتبع
      margin: "0 auto",
      padding: "10px",
      boxSizing: "border-box"
    }}>
      <GText size={22} style={{ textAlign: "center" }}>🕌 PRAYER TRACKER</GText>
      
      {/* كارد التقدم اليومي */}
      <Card dark={dark} style={{ padding: "15px 20px" }}>
        <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 6, letterSpacing: "1px" }}>TODAY'S PROGRESS</div>
        <GText size={18}>{pCount}/5 COMPLETED</GText>
        <div style={{ 
          height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 10, marginTop: 12, overflow: "hidden" 
        }}>
          <div style={{ 
            width: `${(pCount/5)*100}%`, height: "100%", 
            background: "linear-gradient(90deg, #c9a227, #f5e56b)", transition: "0.5s" 
          }} />
        </div>
      </Card>

      {/* قائمة الصلوات */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PRAYERS.map((p) => (
          <button 
            key={p.name}
            onClick={() => setPrayers(prev => ({ ...prev, [p.name]: !prev[p.name] }))}
            style={{
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              padding: "14px 16px", 
              borderRadius: "15px", 
              cursor: "pointer",
              background: prayers[p.name] ? "rgba(201,162,39,0.1)" : "rgba(255,255,255,0.03)",
              border: prayers[p.name] ? "1px solid #c9a227" : "1px solid rgba(255,255,255,0.07)",
              color: "inherit", 
              transition: "0.3s",
              width: "100%",
              outline: "none",
              boxSizing: "border-box"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
              {/* الدائرة التفاعلية */}
              <div style={{ 
                width: 22, 
                height: 22, 
                borderRadius: "50%", 
                border: "2px solid #c9a227", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                background: prayers[p.name] ? "#c9a227" : "transparent",
                flexShrink: 0,
                color: "#000",
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                {prayers[p.name] && "✓"}
              </div>

              {/* نصوص الصلاة */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                <span style={{ fontWeight: "bold", fontSize: "15px", display: "flex", alignItems: "center", gap: 6 }}>
                  {p.icon} {p.name}
                </span>
                <span style={{ fontFamily: "Amiri", fontSize: 13, opacity: 0.6 }}>{p.ar}</span>
              </div>
            </div>

            {/* الوقت */}
            <GText size={14} style={{ opacity: 0.8, flexShrink: 0 }}>{p.time}</GText>
          </button>
        ))}
      </div>
    </div>
  );
}