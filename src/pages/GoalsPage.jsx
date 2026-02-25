import { useState } from "react";
import { Card, STitle, Bar, G, Btn } from "../components/UIComponents";
import { CAT_COLORS } from "../constants";

export default function GoalsPage({ goals, setGoals, txt, txtSub }) {
  const [lt, setLt] = useState("");
  const [lc, setLc] = useState("Worship");
  const [editGoalId, setEditGoalId] = useState(null);
  const [showGoalForm, setShowGoalForm] = useState(false);

  const gCount = goals.filter((g) => g.done).length;

  const addOrEdit = () => {
    if (!lt.trim()) return;
    if (editGoalId) {
      setGoals((p) => p.map((g) => g.id === editGoalId ? { ...g, text: lt, cat: lc } : g));
      setEditGoalId(null);
    } else {
      setGoals((p) => [...p, { id: Date.now().toString(), text: lt.trim(), cat: lc, done: false }]);
    }
    setLt(""); setLc("Worship"); setShowGoalForm(false);
  };

  const startEdit = (g) => {
    setEditGoalId(g.id);
    setLt(g.text);
    setLc(g.cat);
    setShowGoalForm(true);
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: 16, 
      width: "100%", 
      maxWidth: "600px", 
      margin: "0 auto",
      padding: "10px",
      boxSizing: "border-box" 
    }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <G size={22}>🎯 Goals</G>
        <Btn small onClick={() => { setShowGoalForm(true); setEditGoalId(null); setLt(""); }}>+ Add</Btn>
      </div>
      
      {/* Progress Bar Section */}
      {goals.length > 0 && (
        <Card style={{ width: "100%", boxSizing: "border-box" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center" }}>
            <STitle>Today's Progress</STitle>
            <G size={13}>{gCount}/{goals.length}</G>
          </div>
          <Bar pct={(gCount / goals.length) * 100} />
        </Card>
      )}

      {/* Goal Form - Modal Like */}
      {showGoalForm && (
        <Card style={{ border: "1px solid rgba(201,162,39,0.3)", width: "100%", boxSizing: "border-box" }}>
          <STitle>{editGoalId ? "✏️ Edit Goal" : "✨ New Goal"}</STitle>
          <input 
            value={lt} 
            onChange={(e) => setLt(e.target.value)} 
            placeholder="What's your goal?" 
            style={{ 
              background: "rgba(255,255,255,0.06)", 
              border: "1px solid rgba(201,162,39,0.2)", 
              borderRadius: 12, 
              padding: "12px 14px", 
              color: txt, 
              width: "100%", 
              outline: "none", 
              marginBottom: 12,
              boxSizing: "border-box",
              fontSize: "16px" // يمنع الـ Zoom التلقائي في الآيفون
            }} 
          />
          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            <Btn onClick={addOrEdit} style={{ flex: 2 }}>{editGoalId ? "Update" : "Add Goal"}</Btn>
            <Btn outline onClick={() => setShowGoalForm(false)} style={{ flex: 1 }}>Cancel</Btn>
          </div>
        </Card>
      )}

      {/* Goals List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
        {goals.map((g) => (
          <div key={g.id} style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 12, 
            padding: "14px 16px", 
            borderRadius: 16, 
            background: "rgba(255,255,255,0.04)", 
            border: "1px solid rgba(255,255,255,0.07)",
            width: "100%",
            boxSizing: "border-box"
          }}>
            {/* Checkbox Button */}
            <button 
              onClick={() => setGoals(p => p.map(x => x.id === g.id ? { ...x, done: !x.done } : x))} 
              style={{ 
                width: 28, 
                height: 28, 
                borderRadius: "50%", 
                cursor: "pointer", 
                background: g.done ? "linear-gradient(135deg,#c9a227,#f5e56b)" : "transparent", 
                border: "2px solid rgba(201,162,39,0.3)",
                flexShrink: 0,
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                padding: 0
              }}
            >
              {g.done ? "✓" : ""}
            </button>

            {/* Goal Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 600, 
                textDecoration: g.done ? "line-through" : "none", 
                color: txt,
                wordBreak: "break-word",
                lineHeight: "1.4"
              }}>
                {g.text}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button onClick={() => startEdit(g)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", padding: "5px" }}>✏️</button>
              <button onClick={() => setGoals(p => p.filter(x => x.id !== g.id))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", padding: "5px" }}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}