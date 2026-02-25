import { useState } from "react";
import { Card, GText, Btn } from "../components/UI";
import { useUser } from "../context/UserContext";

export default function HabitsPage({ habits, setHabits, dark }) {
  const { user } = useUser();
  const [newHabit, setNewHabit] = useState("");

  const t = {
    title: user.language === "ar" ? "🔥 تتبع العادات" : "🔥 HABITS TRACKER",
    placeholder:
      user.language === "ar" ? "إضافة عادة جديدة..." : "Add new habit...",
    add: user.language === "ar" ? "إضافة" : "Add",
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      const habitObj = {
        id: String(Date.now()),
        name: newHabit,
        icon: "✨",
        done: false,
      };
      setHabits((prev) => [...prev, habitObj]);
      setNewHabit("");
    }
  };

  const toggleHabit = (e, id) => {
    e.stopPropagation();
    setHabits((prevHabits) =>
      prevHabits.map((h) =>
        String(h.id) === String(id) ? { ...h, done: !h.done } : h,
      ),
    );
  };

  const deleteHabit = (e, id) => {
    e.stopPropagation();
    setHabits((prev) => prev.filter((h) => String(h.id) !== String(id)));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        animation: "fadeUp 0.5s ease",
        width: "100%",
        maxWidth: "600px", // يمنع تمدد الصفحة بشكل مبالغ فيه في اللابتوب
        margin: "0 auto", // يوسطن المحتوى
        padding: "10px", // مسافة أمان للموبايل
        boxSizing: "border-box"
      }}
    >
      <GText size={24} style={{ textAlign: "center" }}>{t.title}</GText>

      {/* خانة الإضافة - متجاوبة */}
      <Card
        dark={dark}
        style={{
          display: "flex",
          flexDirection: user.language === "ar" ? "row-reverse" : "row",
          gap: 10,
          padding: "12px",
          border: "1px dashed #c9a227",
          alignItems: "center"
        }}
      >
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder={t.placeholder}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: "inherit",
            outline: "none",
            fontSize: "16px",
            textAlign: user.language === "ar" ? "right" : "left",
            minWidth: "0" // يمنع كسر الـ layout في الشاشات الصغيرة جداً
          }}
          onKeyPress={(e) => e.key === "Enter" && addHabit()}
        />
        <Btn small onClick={addHabit} style={{ flexShrink: 0 }}>
          {t.add}
        </Btn>
      </Card>

      {/* قائمة العادات */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {habits.map((h) => (
          <Card
            key={String(h.id)}
            dark={dark}
            style={{
              display: "flex",
              flexDirection: user.language === "ar" ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              border: h.done
                ? "1px solid #c9a227"
                : "1px solid rgba(255,255,255,0.05)",
              background: h.done ? "rgba(201,162,39,0.08)" : "transparent",
              transition: "0.3s",
              padding: "12px 15px",
              gap: 10
            }}
          >
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 12, 
              flexDirection: user.language === "ar" ? "row-reverse" : "row",
              flex: 1,
              overflow: "hidden" // لمنع النصوص الطويلة من تخريب الشكل
            }}>
              <span style={{ fontSize: 20, opacity: h.done ? 1 : 0.5, flexShrink: 0 }}>
                {h.icon}
              </span>
              <span
                style={{
                  textDecoration: h.done ? "line-through" : "none",
                  opacity: h.done ? 0.5 : 1,
                  fontSize: "15px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis", // لو الاسم طويل جداً هيظهر ...
                  textAlign: user.language === "ar" ? "right" : "left",
                  width: "100%"
                }}
              >
                {h.name}
              </span>
            </div>

            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "12px",
              flexDirection: user.language === "ar" ? "row-reverse" : "row"
            }}>
              {/* زر المسح */}
              <button
                onClick={(e) => deleteHabit(e, h.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  opacity: 0.4,
                  padding: "8px", // تكبير مساحة اللمس
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                🗑️
              </button>

              {/* الدائرة التفاعلية */}
              <button
                onClick={(e) => toggleHabit(e, h.id)}
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  border: "2px solid #c9a227",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: h.done ? "#c9a227" : "transparent",
                  transition: "all 0.2s",
                  color: h.done ? "#fff" : "transparent",
                  fontWeight: "bold",
                  flexShrink: 0,
                  cursor: "pointer",
                  padding: 0,
                  outline: "none"
                }}
              >
                {h.done && "✓"}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}