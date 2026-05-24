import { useState, useEffect } from "react";

export function Topbar({ identity }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`topbar${scrolled ? " topbar--scrolled" : ""}`}>
      <div className="topbar__left">
        <span className="topbar__sig mono">AK</span>
        <span className="topbar__name">{identity.name}</span>
        <span className="topbar__sep">/</span>
        <span className="topbar__role mono dim">{identity.role}</span>
      </div>
      <nav className="topbar__nav">
        <a href="#currently">Now</a>
        <a href="#projects">Work</a>
        <a href="#research">Research</a>
        <a href="#timeline">Background</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
