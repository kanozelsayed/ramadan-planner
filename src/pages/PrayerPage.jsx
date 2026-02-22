import { Card, GText } from "../components/UI";
import { PRAYERS } from "../constants";

export default function PrayerPage({ prayers, setPrayers, dark }) {
  const pCount = Object.values(prayers).filter(Boolean).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <GText size={22}>🕌 PRAYER TRACKER</GText>
      
      <Card dark={dark}>
        <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>TODAY'S PROGRESS</div>
        <GText size={18}>{pCount}/5 COMPLETED</GText>
        <div style={{ 
          height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 10, marginTop: 10, overflow: "hidden" 
        }}>
          <div style={{ 
            width: `${(pCount/5)*100}%`, height: "100%", 
            background: "linear-gradient(90deg, #c9a227, #f5e56b)", transition: "0.5s" 
          }} />
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PRAYERS.map((p) => (
          <button 
            key={p.name}
            onClick={() => setPrayers(prev => ({ ...prev, [p.name]: !prev[p.name] }))}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px", borderRadius: "15px", cursor: "pointer",
              background: prayers[p.name] ? "rgba(201,162,39,0.1)" : "rgba(255,255,255,0.03)",
              border: prayers[p.name] ? "1px solid #c9a227" : "1px solid rgba(255,255,255,0.07)",
              color: "inherit", transition: "0.3s"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ 
                width: 24, height: 24, borderRadius: "50%", 
                border: "2px solid #c9a227", display: "flex", alignItems: "center", justifyContent: "center",
                background: prayers[p.name] ? "#c9a227" : "transparent"
              }}>
                {prayers[p.name] && "✓"}
              </div>
              <span style={{ fontWeight: "bold" }}>{p.icon} {p.name} <span style={{ fontFamily: "Amiri", fontSize: 13, opacity: 0.7 }}>{p.ar}</span></span>
            </div>
            <GText size={14}>{p.time}</GText>
          </button>
        ))}
      </div>
    </div>
  );
}