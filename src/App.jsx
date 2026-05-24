import { useEffect } from "react";
import { CV_DATA } from "./data/cv-data.js";
import { Topbar } from "./components/Topbar.jsx";
import {
  Hero,
  Currently,
  StatsStrip,
  Projects,
  Research,
  Timeline,
  Leadership,
  Stack,
  Contact,
} from "./components/sections.jsx";

const THEME_DEFAULTS = {
  theme: "hud",
  accent: "#38bdf8",
  density: "regular",
  grain: true,
};

const THEMES = {
  hud: {
    "--bg": "#070c18",
    "--bg-2": "#0b1120",
    "--surface": "#0f172a",
    "--surface-2": "#111a2e",
    "--border": "#1e293b",
    "--border-2": "#243049",
    "--text": "#e2e8f0",
    "--text-dim": "#94a3b8",
    "--text-muted": "#64748b",
    "--highlight": "#f59e0b",
  },
  editorial: {
    "--bg": "#f6f4ef",
    "--bg-2": "#efece4",
    "--surface": "#ffffff",
    "--surface-2": "#fbfaf6",
    "--border": "#e3ddd1",
    "--border-2": "#d6cebd",
    "--text": "#1a1a1a",
    "--text-dim": "#5b5b5b",
    "--text-muted": "#8a8a8a",
    "--highlight": "#b45309",
  },
  terminal: {
    "--bg": "#0a0a0a",
    "--bg-2": "#0e0e0e",
    "--surface": "#121212",
    "--surface-2": "#161616",
    "--border": "#1f1f1f",
    "--border-2": "#2a2a2a",
    "--text": "#d6f5d6",
    "--text-dim": "#7fb47f",
    "--text-muted": "#4f7a4f",
    "--highlight": "#f5d76e",
  },
};

function applyTheme(t) {
  const theme = THEMES[t.theme] || THEMES.hud;
  const root = document.documentElement;
  Object.entries(theme).forEach(([k, v]) => {
    if (k.startsWith("--")) root.style.setProperty(k, v);
  });
  root.style.setProperty("--accent", t.accent);
  root.dataset.theme = t.theme;
  root.dataset.density = t.density;
  root.dataset.grain = t.grain ? "on" : "off";
}

export default function App() {
  useEffect(() => {
    applyTheme(THEME_DEFAULTS);
  }, []);

  return (
    <div className="cv">
      <Topbar identity={CV_DATA.identity} />
      <main className="cv__main">
        <Hero d={CV_DATA} />
        <Currently d={CV_DATA} />
        <StatsStrip d={CV_DATA} />
        <Projects d={CV_DATA} />
        <Research d={CV_DATA} />
        <Timeline d={CV_DATA} />
        <Leadership d={CV_DATA} />
        <Stack d={CV_DATA} />
        <Contact d={CV_DATA} />
      </main>
    </div>
  );
}
