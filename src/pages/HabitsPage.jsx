import { useState } from "react";
import { Card, GText, Btn } from "../components/UI";
import { useUser } from "../context/UserContext";

export default function HabitsPage({ habits, setHabits, dark }) {
  const { user } = useUser();
  const [newHabit, setNewHabit] = useState("");

  const t = {
    title: user.language === 'ar' ? "🔥 تتبع العادات" : "🔥 HABITS TRACKER",
    placeholder: user.language === 'ar' ? "إضافة عادة جديدة..." : "Add new habit...",
    add: user.language === 'ar' ? "إضافة" : "Add"
  };

  // 1. إضافة عادة جديدة
  const addHabit = () => {
    if (newHabit.trim()) {
      const habitObj = {
        id: Date.now().toString(),
        name: newHabit,
        icon: "✨",
        done: false
      };
      setHabits([...habits, habitObj]);
      setNewHabit("");
    }
  };

  // 2. تغيير حالة العادة (علامة الصح والدائرة)
  const toggleHabit = (id) => {
    const updated = habits.map(h => 
      h.id === id ? { ...h, done: !h.done } : h
    );
    setHabits(updated);
  };

  // 3. حذف عادة
  const deleteHabit = (e, id) => {
    e.stopPropagation(); // عشان ميعملش Done وأنا بمسح
    const filtered = habits.filter(h => h.id !== id);
    setHabits(filtered);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeUp 0.5s ease" }}>
      <GText size={24}>{t.title}</GText>
      
      {/* خانة الإضافة */}
      <Card dark={dark} style={{ display: "flex", gap: 10, padding: "15px", border: "1px dashed #c9a227" }}>
        <input 
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder={t.placeholder}
          style={{ 
            flex: 1, background: "transparent", border: "none", 
            color: "inherit", outline: "none", fontSize: "16px",
            textAlign: user.language === 'ar' ? 'right' : 'left'
          }}
          onKeyPress={(e) => e.key === 'Enter' && addHabit()}
        />
        <Btn small onClick={addHabit}>{t.add}</Btn>
      </Card>

      {/* قائمة العادات */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {habits.map(h => (
          <Card 
            key={h.id} 
            dark={dark} 
            onClick={() => toggleHabit(h.id)}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              cursor: "pointer",
              border: h.done ? "1px solid #c9a227" : "1px solid rgba(255,255,255,0.05)",
              background: h.done ? "rgba(201,162,39,0.08)" : "transparent",
              transition: "0.3s"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              {/* أيقونة العادة */}
              <span style={{ fontSize: 22, opacity: h.done ? 1 : 0.5 }}>{h.icon}</span>
              {/* اسم العادة */}
              <span style={{ 
                textDecoration: h.done ? "line-through" : "none", 
                opacity: h.done ? 0.5 : 1,
                fontSize: "16px",
                fontWeight: "500"
              }}>
                {h.name}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {/* زرار المسح */}
              <button 
                onClick={(e) => deleteHabit(e, h.id)}
                style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "18px", opacity: 0.4 }}
              >
                🗑️
              </button>

              {/* الدائرة التفاعلية */}
              <div 
                style={{ 
                  width: "24px", 
                  height: "24px", 
                  borderRadius: "50%", 
                  border: "2px solid #c9a227",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: h.done ? "#c9a227" : "transparent",
                  transition: "all 0.2s",
                  color: "#000",
                  fontWeight: "bold"
                }}
              >
                {h.done && "✓"}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}