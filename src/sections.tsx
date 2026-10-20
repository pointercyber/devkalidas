import { useState, type PointerEvent as RPointerEvent } from "react";
import Reveal from "./Reveal";
import PhotoGL from "./PhotoGL";

const line = { borderTop: "2px solid #ffffff" } as const;

export function Hero() {
  const move = (e: RPointerEvent<HTMLElement>) => {
    const el = e.currentTarget, b = el.getBoundingClientRect();
    el.style.setProperty("--mx", String(((e.clientX - b.left) / b.width - 0.5) * 2));
    el.style.setProperty("--my", String(((e.clientY - b.top) / b.height - 0.5) * 2));
  };
  return (
    <section className="hero z" onPointerMove={move}>
      <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>Kalidas R. — Developer, Designer, Builder</h1>
      <div className="sub">नमस्ते · Developer · Designer · Builder<br />Building ideas into digital experiences.</div>
      <div className="hd" aria-hidden="true">कालिदास</div>
      <PhotoGL className="photo" alt="Kalidas" />
    </section>
  );
}

export function Marquee({ text, k, o = 0, outline = false }: { text: string; k: number; o?: number; outline?: boolean }) {
  return (
    <div className={`mq z${outline ? " ol" : ""}`} style={{ transform: `translateX(calc(var(--s)*${k}px + ${o}vw))` }}>{text}</div>
  );
}

export function Drop() {
  const z = { position: "relative", zIndex: 3 } as const;
  return (
    <section className="z drop">
      <Reveal><h2 className="dh">New<br />work</h2></Reveal>
      <Reveal><p className="sm" style={z}>Simple ideas.<br />Built bold.</p></Reveal>
      <Reveal><a className="pill" style={z} href="#work">See projects <i>→</i></a></Reveal>
      <PhotoGL className="dimg" />
    </section>
  );
}

type Project = { name: string; url?: string };
const PROJECTS: Project[] = [
  { name: "Bytewise", url: "https://bytewise-zeta.vercel.app/" },
  { name: "C Bytewise", url: "https://cbytewise.vercel.app/" },
  { name: "Next project" }, { name: "Experiment 01" }, { name: "Experiment 02" }, { name: "Something new" },
];

export function Work() {
  const [count, setCount] = useState(2);
  return (
    <section id="work" className="z">
      <Reveal><small className="eb">०१ — काम · Work</small><h2 className="mid" style={{ marginBottom: 40 }}>Selected work</h2></Reveal>
      {PROJECTS.slice(0, count).map((p) =>
        p.url ? (
          <a key={p.name} className="row pop" href={p.url} target="_blank" rel="noopener noreferrer">{p.name}<span>Visit ↗</span></a>
        ) : (
          <div key={p.name} className="row soon pop">{p.name}<span>In progress</span></div>
        )
      )}
      <div style={line} />
      {count < PROJECTS.length && (
        <button className="pill" onClick={() => setCount((c) => c + 2)}>Load more <i>+</i></button>
      )}
    </section>
  );
}

const SERVICES: [string, string][] = [
  ["Develop", "Fast, clean web apps with React, TypeScript and Vite."],
  ["Design", "Bold, simple interfaces with big type and room to breathe."],
  ["Build", "From first idea to a live link, end to end."],
];
const STACK = ["React", "TypeScript", "Vite", "WebGL", "JavaScript", "HTML", "CSS"];

export function Services() {
  const [open, setOpen] = useState(0);
  return (
    <section className="z">
      <Reveal><small className="eb">०२ — कला · Craft</small><h2 className="mid" style={{ marginBottom: 40 }}>What I do</h2></Reveal>
      {SERVICES.map(([title, text], i) => (
        <button key={title} className={`svc${open === i ? " o" : ""}`} onClick={() => setOpen(open === i ? -1 : i)}>
          <b>{title}<span>{open === i ? "–" : "+"}</span></b>
          <p>{text}</p>
        </button>
      ))}
      <div style={line} />
      <Reveal><div className="chips">{STACK.map((c) => <span key={c} className="chip">{c}</span>)}</div></Reveal>
    </section>
  );
}

const STEPS = [
  ["01", "Idea", "Start with the simplest version of the thing."],
  ["02", "Design", "Big type, few elements, one strong move."],
  ["03", "Build", "Code it clean, then add motion."],
  ["04", "Launch", "Ship it, share the link, improve."],
];

export function Process() {
  return (
    <section className="z">
      <Reveal><small className="eb">०४ — प्रक्रिया · Method</small><h2 className="mid">How I build</h2></Reveal>
      <div className="steps">
        {STEPS.map(([n, t, d]) => (
          <Reveal key={n} className="step">
            <em>{n}</em>
            <div><div style={{ fontSize: 28, marginBottom: 8 }}>{t}</div><div style={{ fontSize: 14, fontWeight: 600 }}>{d}</div></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="z">
      <Reveal><small className="eb">०५ — परिचय · About</small><h2 className="mid">About</h2></Reveal>
      <div className="bento">
        <Reveal className="bc b22">
          <small>Hello</small>
          <div className="mid" style={{ fontSize: "clamp(36px,5vw,72px)" }}>Confidence?<br />It’s in the build.</div>
          <small>I make simple, bold things for the web. Fewer elements, stronger ideas.</small>
        </Reveal>
        <Reveal className="bc w b2"><small>GitHub</small><a href="https://github.com/pointercyber" style={{ fontSize: 28 }}>pointercyber ↗</a></Reveal>
        <Reveal className="bc w b2"><small>Instagram</small><a href="https://instagram.com/kalidas_012" style={{ fontSize: 28 }}>kalidas_012 ↗</a></Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="z">
      <Reveal><small className="eb">०६ — संपर्क · Contact</small><h2 className="big">Have an idea?</h2></Reveal>
      <Reveal><a className="pill" href="mailto:kalidask098@gmail.com">Say hello <i>→</i></a></Reveal>
      <Reveal>
        <p className="sm">
          <a href="https://github.com/pointercyber">GitHub</a> · <a href="https://instagram.com/kalidas_012">Instagram</a> · <a href="https://buymeacoffee.com/kalidasr">Buy me a coffee</a>
        </p>
      </Reveal>
    </section>
  );
}

export function Band() { return <div className="band" aria-hidden="true" />; }

function ring(n: number, off = 0) { return Array.from({ length: n }, (_, i) => (360 / n) * i + off); }
const T = (a: number) => `rotate(${a} 100 100)`;

function Mandala() {
  return (
    <svg className="mand" viewBox="0 0 200 200" fill="none" strokeWidth="1.4" aria-hidden="true">
      <g className="m" stroke="#0b0b0b">{ring(36).map((a) => <circle key={a} cx="100" cy="4" r="2" transform={T(a)} />)}</g>
      <g className="m r" stroke="#ffffff"><circle cx="100" cy="100" r="92" /><circle cx="100" cy="100" r="88" />{ring(24).map((a) => <path key={a} d="M100 10C106 20 106 30 100 40C94 30 94 20 100 10Z" transform={T(a)} />)}</g>
      <g className="m" stroke="#ffffff" fill="rgba(255,255,255,.1)">{ring(12).map((a) => <path key={a} d="M100 36C116 54 116 72 100 90C84 72 84 54 100 36Z" transform={T(a)} />)}</g>
      <g className="m r" stroke="#0b0b0b">{ring(12, 15).map((a) => <path key={a} d="M100 52C108 64 108 76 100 86C92 76 92 64 100 52Z" transform={T(a)} />)}</g>
      <g className="m" stroke="#ffffff">{ring(8).map((a) => <ellipse key={a} cx="100" cy="82" rx="6" ry="11" transform={T(a)} />)}</g>
      <circle cx="100" cy="100" r="16" fill="#0b0b0b" stroke="none" /><circle cx="100" cy="100" r="9" fill="#EC4A1E" stroke="none" /><circle cx="100" cy="100" r="3.5" fill="#ffffff" stroke="none" />
    </svg>
  );
}

function Diya() {
  return (
    <svg className="diya" viewBox="0 0 120 100" aria-hidden="true">
      <path className="fl" d="M60 4C46 26 40 40 60 56C80 40 74 26 60 4Z" fill="#0b0b0b" />
      <path className="fl" d="M60 24C54 34 52 42 60 50C68 42 66 34 60 24Z" fill="#ffffff" />
      <path d="M8 62Q60 112 112 62Z" fill="#ffffff" />
      <path d="M8 62H112" stroke="#0b0b0b" strokeWidth="4" strokeLinecap="round" />
      <rect x="56" y="54" width="8" height="10" rx="3" fill="#ffffff" />
    </svg>
  );
}

function Diyas() { return <div className="diyas"><Diya /><Diya /><Diya /></div>; }

export function Heritage() {
  return (
    <section className="z heritage">
      <div>
        <Reveal><small className="eb">०३ — संस्कृति · Rooted in tradition</small></Reveal>
        <Reveal><h2 className="mid" style={{ marginTop: 20, fontSize: "clamp(32px,6.2vw,84px)" }}>कर्मण्येवाधिकारस्ते</h2></Reveal>
        <Reveal><p className="sm">“You have the right to action alone.” — Bhagavad Gita 2.47. I build with that mindset: do the work with care, then let it speak.</p></Reveal>
        <Reveal><Diyas /></Reveal>
      </div>
      <Mandala />
    </section>
  );
}
