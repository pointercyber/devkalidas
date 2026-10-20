import Intro from "./Intro";
import Background from "./Background";
import Cursor from "./Cursor";
import Logo from "./Logo";
import { Hero, Marquee, Drop, Work, Services, Process, About, Contact, Band, Heritage } from "./sections";

export default function App() {
  return (
    <>
      <Intro />
      <Background />
      <Cursor />
      <div id="bar" />
      <header className="z">
        <a href="#top" className="brand"><Logo />Kalidas.</a>
        <nav><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
      </header>
      <main id="top">
        <Hero />
        <Marquee text="Developer — Designer — Builder — Developer — Designer — Builder —" k={-0.6} />
        <Drop />
        <Band />
        <Work />
        <Services />
        <Marquee text="Let’s build — Let’s build — Let’s build — Let’s build —" k={0.6} o={-120} outline />
        <Heritage />
        <Marquee text="नमस्ते — வணக்கம் — നമസ്കാരം — నమస్కారం — ನಮಸ್ಕಾರ — নমস্কার — नमस्ते — வணக்கம் — " k={-0.5} />
        <Process />
        <About />
        <Band />
        <Contact />
      </main>
      <footer className="z fb">
        <Logo />
        <div className="mid" style={{ fontSize: "clamp(32px,6vw,72px)" }}>कालिदास</div>
        <span>Kalidas R. · Developer · Designer · Builder</span>
        <span style={{ opacity: 0.7 }}>© 2026 · Designed with intention.</span>
      </footer>
    </>
  );
}
