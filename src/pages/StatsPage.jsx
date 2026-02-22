import { Card, GText } from "../components/UI";

export default function StatsPage({ dark, pCount, jCount, gCount, hCount }) {
  // داتا وهمية للرسم البياني زي اللي في السكرين شوت
  const chartData = [
    { day: "Mon", val: 3 }, { day: "Tue", val: 5 }, { day: "Wed", val: 4 },
    { day: "Thu", val: 5 }, { day: "Fri", val: 2 }, { day: "Sat", val: 5 }, { day: "Sun", val: pCount }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeUp 0.5s ease" }}>
      <GText size={24}>📊 STATISTICS</GText>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        <Card dark={dark} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24 }}>🕌</div>
          <GText size={20}>{pCount}/5</GText>
          <div style={{ fontSize: 10, opacity: 0.6 }}>Prayers</div>
        </Card>
        <Card dark={dark} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24 }}>📖</div>
          <GText size={20}>{jCount}/30</GText>
          <div style={{ fontSize: 10, opacity: 0.6 }}>Juz Done</div>
        </Card>
      </div>

      <Card dark={dark}>
        <div style={{ fontSize: 11, fontWeight: "bold", marginBottom: 20, opacity: 0.7 }}>PRAYER HISTORY</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 100 }}>
          {chartData.map(d => (
            <div key={d.day} style={{ textAlign: "center", flex: 1 }}>
              <div style={{ 
                height: d.val * 15, 
                background: d.val === 5 ? "linear-gradient(#f5e56b, #c9a227)" : "#c9a227", 
                margin: "0 5px", borderRadius: "4px 4px 0 0" 
              }} />
              <div style={{ fontSize: 9, marginTop: 5 }}>{d.day}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}