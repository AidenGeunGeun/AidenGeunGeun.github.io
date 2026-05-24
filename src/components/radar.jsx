import { useState, useEffect, useMemo } from "react";

function CornerBracket({ x, y, size, accent, flipX, flipY }) {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;
  return (
    <g stroke={accent} strokeOpacity="0.55" fill="none" strokeWidth="1">
      <line x1={x} y1={y} x2={x + sx * size} y2={y} />
      <line x1={x} y1={y} x2={x} y2={y + sy * size} />
    </g>
  );
}

export function HudRadar({ size = 360, accent = "var(--accent)", running = true }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!running) return;
    let raf;
    let start;
    const loop = (now) => {
      if (!start) start = now;
      setT((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const cx = size / 2;
  const cy = size / 2;
  const sweepAngle = (t * 35) % 360;
  const sweepRad = ((sweepAngle - 90) * Math.PI) / 180;
  const r = size * 0.42;

  const tp = (t % 6) / 6;
  const ax = cx - r * 1.1;
  const ay = cy + r * 0.55;
  const bx = cx + r * 1.15;
  const by = cy - r * 0.25;
  const peakY = cy - r * 0.95;
  const u = tp;
  const oneMinusU = 1 - u;
  const py = oneMinusU * oneMinusU * ay + 2 * oneMinusU * u * peakY + u * u * by;
  const px = oneMinusU * oneMinusU * ax + 2 * oneMinusU * u * cx + u * u * bx;

  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 22; i++) {
      arr.push({
        x: (Math.sin(i * 9.13) * 0.5 + 0.5) * size,
        y: (Math.cos(i * 7.51) * 0.5 + 0.5) * size,
        r: 0.5 + Math.abs(Math.sin(i * 3.7)) * 1.1,
        tw: (i % 5) * 0.3,
      });
    }
    return arr;
  }, [size]);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <radialGradient id="rgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.04" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rgSweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="rgTraj" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.85" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <g stroke="rgba(148,163,184,0.10)" strokeWidth="1" fill="none">
        <line x1="0" y1={cy} x2={size} y2={cy} />
        <line x1={cx} y1="0" x2={cx} y2={size} />
        <line x1={cx - r * 1.5} y1="0" x2={cx - r * 1.5} y2={size} />
        <line x1={cx + r * 1.5} y1="0" x2={cx + r * 1.5} y2={size} />
        <line x1="0" y1={cy - r * 1.1} x2={size} y2={cy - r * 1.1} />
        <line x1="0" y1={cy + r * 1.1} x2={size} y2={cy + r * 1.1} />
      </g>

      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#cbd5e1"
          opacity={0.35 + 0.4 * Math.abs(Math.sin(t * 1.2 + s.tw))}
        />
      ))}

      <circle cx={cx} cy={cy} r={r * 1.15} fill="url(#rgGlow)" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={accent} strokeOpacity="0.22" />
      <circle cx={cx} cy={cy} r={r * 0.66} fill="none" stroke={accent} strokeOpacity="0.18" />
      <circle cx={cx} cy={cy} r={r * 0.33} fill="none" stroke={accent} strokeOpacity="0.14" />

      {[0, 90, 180, 270].map((deg) => {
        const a = ((deg - 90) * Math.PI) / 180;
        const x1 = cx + Math.cos(a) * r;
        const y1 = cy + Math.sin(a) * r;
        const x2 = cx + Math.cos(a) * (r + 12);
        const y2 = cy + Math.sin(a) * (r + 12);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeOpacity="0.45" />;
      })}

      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos(sweepRad) * r}
        y2={cy + Math.sin(sweepRad) * r}
        stroke="url(#rgSweep)"
        strokeWidth="1.5"
      />

      <path
        d={`M ${ax} ${ay} Q ${cx} ${peakY} ${bx} ${by}`}
        fill="none"
        stroke="url(#rgTraj)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <circle cx={px} cy={py} r="4" fill={accent}>
        <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx={px} cy={py} r="9" fill="none" stroke={accent} strokeOpacity="0.5">
        <animate attributeName="r" values="6;14;6" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="1.6s" repeatCount="indefinite" />
      </circle>

      <g stroke={accent} strokeOpacity="0.7" strokeWidth="1">
        <line x1={cx - 7} y1={cy} x2={cx + 7} y2={cy} />
        <line x1={cx} y1={cy - 7} x2={cx} y2={cy + 7} />
      </g>
      <circle cx={cx} cy={cy} r="2" fill={accent} />

      <CornerBracket x={6} y={6} size={14} accent={accent} />
      <CornerBracket x={size - 6} y={6} size={14} accent={accent} flipX />
      <CornerBracket x={6} y={size - 6} size={14} accent={accent} flipY />
      <CornerBracket x={size - 6} y={size - 6} size={14} accent={accent} flipX flipY />
    </svg>
  );
}
