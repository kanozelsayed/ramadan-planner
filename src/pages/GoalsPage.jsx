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
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <G size={22}>🎯 Goals</G>
        <Btn small onClick={() => { setShowGoalForm(true); setEditGoalId(null); setLt(""); }}>+ Add</Btn>
      </div>
      
      {goals.length > 0 && (
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <STitle>Today's Progress</STitle>
            <G size={13}>{gCount}/{goals.length}</G>
          </div>
          <Bar pct={(gCount / goals.length) * 100} />
        </Card>
      )}

      {showGoalForm && (
        <Card style={{ border: "1px solid rgba(201,162,39,0.3)" }}>
          <STitle>{editGoalId ? "✏️ Edit Goal" : "✨ New Goal"}</STitle>
          <input value={lt} onChange={(e) => setLt(e.target.value)} placeholder="What's your goal?" 
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,162,39,0.2)", borderRadius: 12, padding: "10px 14px", color: txt, width: "100%", outline: "none", marginBottom: 12 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={addOrEdit} style={{ flex: 1 }}>{editGoalId ? "Update" : "Add Goal"}</Btn>
            <Btn outline onClick={() => setShowGoalForm(false)}>Cancel</Btn>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {goals.map((g) => (
          <div key={g.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <button onClick={() => setGoals(p => p.map(x => x.id === g.id ? { ...x, done: !x.done } : x))} style={{ width: 28, height: 28, borderRadius: "50%", cursor: "pointer", background: g.done ? "linear-gradient(135deg,#c9a227,#f5e56b)" : "transparent", border: "2px solid rgba(201,162,39,0.3)" }}>{g.done ? "✓" : ""}</button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, textDecoration: g.done ? "line-through" : "none", color: txt }}>{g.text}</div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={() => startEdit(g)} style={{ background: "none", border: "none", cursor: "pointer" }}>✏️</button>
              <button onClick={() => setGoals(p => p.filter(x => x.id !== g.id))} style={{ background: "none", border: "none", cursor: "pointer" }}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}