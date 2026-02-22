import { useState } from "react";

export const Card = ({ children, style = {}, glow }) => (
  <div style={{
    background: "rgba(255,255,255,0.04)",
    border: glow ? "1px solid rgba(201,162,39,0.35)" : "1px solid rgba(255,255,255,0.07)",
    borderRadius: 20, padding: 20, backdropFilter: "blur(12px)",
    boxShadow: glow ? "0 0 30px rgba(201,162,39,0.08)" : "none", ...style
  }}>{children}</div>
);

export const Bar = ({ pct, h = 8 }) => (
  <div style={{ height: h, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: "linear-gradient(90deg,#c9a227,#f5e56b)", borderRadius: 99, transition: "width 0.6s ease" }} />
  </div>
);

export const G = ({ children, size = 14, weight = 700 }) => (
  <span style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: size, fontWeight: weight, background: "linear-gradient(135deg,#c9a227,#f5e56b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{children}</span>
);

export const Btn = ({ children, onClick, small, danger, outline, style = {} }) => {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: danger ? "rgba(239,68,68,0.15)" : outline ? "transparent" : hov ? "linear-gradient(135deg,#a07d1a,#d4bc30)" : "linear-gradient(135deg,#c9a227,#f5e56b)",
        border: danger ? "1px solid rgba(239,68,68,0.3)" : outline ? "1px solid rgba(201,162,39,0.4)" : "none",
        color: danger ? "#f87171" : outline ? "#f5e56b" : "#0a0e1a",
        borderRadius: 12, fontWeight: 700, cursor: "pointer", padding: small ? "6px 14px" : "10px 22px", fontSize: small ? 12 : 14, transition: "all 0.2s", transform: hov ? "scale(1.03)" : "scale(1)", ...style
      }}>{children}</button>
  );
};

export const STitle = ({ children }) => (
  <div style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 11, letterSpacing: 2, background: "linear-gradient(135deg,#c9a227,#f5e56b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 14, textTransform: "uppercase" }}>{children}</div>
);

export function Ring({ pct, size = 120, stroke = 9, label, sub }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#g)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ - (Math.min(pct, 100) / 100) * circ} style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(.4,0,.2,1)" }} />
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#c9a227" /><stop offset="100%" stopColor="#f5e56b" /></linearGradient></defs>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
        {label && <G size={18}>{label}</G>}
        {sub && <div style={{ fontSize: 11, opacity: 0.5 }}>{sub}</div>}
      </div>
    </div>
  );
}