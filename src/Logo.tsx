export default function Logo() {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return <circle key={i} cx={20 + 15 * Math.sin(a)} cy={20 - 15 * Math.cos(a)} r="1.4" fill="#0b0b0b" />;
  });
  return (
    <svg viewBox="0 0 40 40" role="img" aria-label="Kalidas logo">
      <circle cx="20" cy="20" r="19" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      {dots}
      <text x="20" y="27" textAnchor="middle" fontSize="19" fontWeight="800" fill="#ffffff" style={{ fontFamily: "'Inter Tight',system-ui,sans-serif", letterSpacing: "-.05em" }}>K</text>
    </svg>
  );
}
