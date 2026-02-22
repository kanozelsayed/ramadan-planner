import { useState } from "react";

// 1. المكون اللي كان ناقص ومسبب المشكلة
export const STitle = ({ children }) => (
  <div style={{ 
    fontFamily: "'Cinzel Decorative', serif", fontSize: 11, letterSpacing: 2, 
    background: "linear-gradient(135deg, #c9a227, #f5e56b)", 
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", 
    marginBottom: 14, textTransform: "uppercase" 
  }}>
    {children}
  </div>
);

// 2. مكون النص الذهبي
export const GText = ({ children, size = 14 }) => (
  <span style={{ 
    fontFamily: "'Cinzel Decorative', serif", fontSize: size, fontWeight: 700, 
    background: "linear-gradient(135deg, #c9a227, #f5e56b)", 
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" 
  }}>
    {children}
  </span>
);

// 3. مكون الكارد (يدعم الـ Light/Dark Mode)
export const Card = ({ children, style = {}, dark }) => (
  <div style={{
    background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
    border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(201,162,39,0.2)",
    borderRadius: 20, padding: 20, backdropFilter: "blur(12px)", 
    boxShadow: dark ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
    ...style
  }}>
    {children}
  </div>
);

// 4. مكون الزرار الاحترافي
export const Btn = ({ children, onClick, small, outline, style = {} }) => {
  const [hov, setHov] = useState(false);
  return (
    <button 
      onClick={onClick} 
      onMouseEnter={() => setHov(true)} 
      onMouseLeave={() => setHov(false)}
      style={{
        background: outline ? "transparent" : (hov ? "#d4bc30" : "#c9a227"),
        border: "1px solid #c9a227",
        color: outline ? "#c9a227" : "#0a0e1a",
        borderRadius: 12, padding: small ? "6px 14px" : "10px 22px",
        cursor: "pointer", transition: "all 0.2s", fontWeight: 700,
        transform: hov ? "scale(1.03)" : "scale(1)", ...style
      }}>
      {children}
    </button>
  );
};

// 5. مكون الـ Ring (الدوائر الملونة)
export function Ring({ pct, size = 120, stroke = 9, label, sub, dark }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#c9a227" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ - (Math.min(pct, 100) / 100) * circ} style={{ transition: "stroke-dashoffset 0.7s" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <GText size={18}>{label}</GText>
        <span style={{ fontSize: 10, opacity: 0.5 }}>{sub}</span>
      </div>
    </div>
  );
}