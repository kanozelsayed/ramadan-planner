import { Card, GText } from "../components/UI";

export default function StatsPage({ dark, pCount, jCount, gCount, hCount }) {
  // داتا وهمية للرسم البياني
  const chartData = [
    { day: "Mon", val: 3 }, { day: "Tue", val: 5 }, { day: "Wed", val: 4 },
    { day: "Thu", val: 5 }, { day: "Fri", val: 2 }, { day: "Sat", val: 5 }, { day: "Sun", val: pCount }
  ];

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: 20, 
      animation: "fadeUp 0.5s ease",
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "10px",
      boxSizing: "border-box"
    }}>
      <GText size={24} style={{ textAlign: "center" }}>📊 STATISTICS</GText>

      {/* الكروت العلوية - شبكة متجاوبة */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(2, 1fr)", 
        gap: window.innerWidth < 480 ? "8px" : "12px" 
      }}>
        <Card dark={dark} style={{ textAlign: "center", padding: "15px 10px" }}>
          <div style={{ fontSize: 24, marginBottom: 5 }}>🕌</div>
          <GText size={20}>{pCount}/5</GText>
          <div style={{ fontSize: 11, opacity: 0.6 }}>Prayers</div>
        </Card>
        <Card dark={dark} style={{ textAlign: "center", padding: "15px 10px" }}>
          <div style={{ fontSize: 24, marginBottom: 5 }}>📖</div>
          <GText size={20}>{jCount}/30</GText>
          <div style={{ fontSize: 11, opacity: 0.6 }}>Juz Done</div>
        </Card>
      </div>

      {/* الرسم البياني */}
      <Card dark={dark} style={{ padding: "20px 15px" }}>
        <div style={{ 
          fontSize: 11, 
          fontWeight: "bold", 
          marginBottom: 25, 
          opacity: 0.7, 
          letterSpacing: "1px",
          textAlign: "center"
        }}>
          PRAYER HISTORY (WEEKLY)
        </div>
        
        <div style={{ 
          display: "flex", 
          alignItems: "flex-end", 
          justifyContent: "space-between", 
          height: 120, // زودت الارتفاع شوية عشان الشكل يبقى أوضح
          paddingBottom: 10
        }}>
          {chartData.map(d => (
            <div key={d.day} style={{ 
              textAlign: "center", 
              flex: 1, 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center" 
            }}>
              {/* العمود نفسه */}
              <div style={{ 
                height: d.val * 20, // ضربت في 20 لزيادة الوضوح
                width: window.innerWidth < 480 ? "12px" : "18px", // عرض العمود يصغر في الموبايل
                background: d.val === 5 
                  ? "linear-gradient(#f5e56b, #c9a227)" 
                  : "rgba(201,162,39,0.5)", 
                borderRadius: "4px 4px 0 0",
                transition: "height 0.5s ease",
                boxShadow: d.val === 5 ? "0 0 10px rgba(201,162,39,0.3)" : "none"
              }} />
              
              {/* اسم اليوم */}
              <div style={{ 
                fontSize: 9, 
                marginTop: 8, 
                fontWeight: "bold", 
                opacity: d.day === "Sun" ? 1 : 0.5,
                color: d.day === "Sun" ? "#c9a227" : "inherit"
              }}>
                {d.day}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}