import { useState, useEffect, useMemo, useRef } from "react";
import { HudRadar } from "./radar.jsx";

function SectionHeader({ index, kicker, title, sub }) {
  return (
    <header className="sec-head">
      <div className="sec-head__meta">
        <span className="sec-head__idx">{String(index).padStart(2, "0")}</span>
        <span className="sec-head__div" />
        <span className="sec-head__kicker">{kicker}</span>
      </div>
      <h2 className="sec-head__title">{title}</h2>
      {sub ? <p className="sec-head__sub">{sub}</p> : null}
    </header>
  );
}

function StatusDot({ tone = "sky", pulse = true }) {
  return <span className={`dot dot--${tone}${pulse ? " dot--pulse" : ""}`} />;
}

function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "-10% 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? " reveal--in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Clock({ tz }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  return <span className="mono">{fmt} KST</span>;
}

export function Hero({ d }) {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero__grid">
        <div className="hero__left">
          <div className="hero__topline">
            <StatusDot tone="sky" />
            <span className="mono dim micro">Daejeon, KR · KAIST &apos;26</span>
          </div>

          <h1 className="hero__name">
            <span className="hero__name-en">{d.identity.name}</span>
            <span className="hero__name-ko">{d.identity.nameKo}</span>
          </h1>

          <p className="hero__role">{d.identity.role}</p>
          <p className="hero__blurb">{d.identity.blurb}</p>

          <div className="hero__meta">
            <div className="hero__meta-cell">
              <span className="mono dim micro">LOC</span>
              <span>{d.identity.location}</span>
            </div>
            <div className="hero__meta-cell">
              <span className="mono dim micro">LOCAL</span>
              <Clock tz={d.identity.tz} />
            </div>
            <div className="hero__meta-cell">
              <span className="mono dim micro">STATUS</span>
              <span>{d.identity.status}</span>
            </div>
          </div>

          <div className="hero__ctas">
            <a className="btn btn--primary" href="mailto:skybluejacket@kaist.ac.kr">
              <span>Get in touch</span>
              <span className="btn__arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="https://github.com/AidenGeunGeun" target="_blank" rel="noreferrer">
              <span>GitHub</span>
            </a>
            <a className="btn btn--ghost" href="#projects">
              <span>See work</span>
            </a>
          </div>
        </div>

        <div className="hero__right">
          <div className="hud">
            <div className="hud__stage">
              <HudRadar size={420} accent="var(--accent)" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <span className="mono micro dim">SCROLL</span>
        <span className="hero__scroll-bar" />
      </div>
    </section>
  );
}

export function Currently({ d }) {
  return (
    <section className="block" id="currently" data-screen-label="02 Currently">
      <SectionHeader index={1} kicker="NOW" title="Currently" sub="Three threads I'm actively pulling on." />
      <div className="cur-grid">
        {d.currently.map((c, i) => (
          <Reveal key={c.org} delay={i * 80}>
            <article className="cur-card">
              <div className="cur-card__head">
                <span className={`pill pill--${c.statusTone}`}>{c.status}</span>
                <span className="mono micro dim">{c.meta}</span>
              </div>
              <h3 className="cur-card__org">{c.org}</h3>
              <p className="cur-card__role">{c.role}</p>
              <p className="cur-card__detail">{c.detail}</p>
              <div className="cur-card__corners">
                <span /><span /><span /><span />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CountUp({ to, dur = 900 }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const start = performance.now();
        const animate = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(to * eased));
          if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        io.disconnect();
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, dur]);

  return <span ref={ref}>{n}</span>;
}

export function StatsStrip({ d }) {
  return (
    <section className="stats">
      {d.stats.map((s, i) => (
        <div className="stats__cell" key={i}>
          <div className="stats__val">
            <CountUp to={parseInt(s.value, 10)} />
            <span className="stats__unit">{s.unit}</span>
          </div>
          <div className="stats__label">{s.label}</div>
        </div>
      ))}
    </section>
  );
}

export function Projects({ d }) {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? d.projects : d.projects.filter((p) => p.cat === active);
  const counts = useMemo(() => {
    const c = { all: d.projects.length };
    d.projects.forEach((p) => {
      c[p.cat] = (c[p.cat] || 0) + 1;
    });
    return c;
  }, [d.projects]);

  return (
    <section className="block" id="projects" data-screen-label="03 Projects">
      <SectionHeader
        index={2}
        kicker="OPEN SOURCE"
        title="Featured work"
        sub="Token-efficient agent infrastructure, aerospace sim, and the rest."
      />

      <div className="proj-filter">
        {d.categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`chip${active === c.id ? " chip--on" : ""}`}
            onClick={() => setActive(c.id)}
          >
            <span>{c.label}</span>
            <span className="chip__count mono">{counts[c.id] || 0}</span>
          </button>
        ))}
      </div>

      <div className="proj-grid">
        {filtered.map((p, i) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="proj"
            style={{ "--i": i }}
          >
            <div className="proj__top">
              <span className={`proj__lang lang--${p.lang.toLowerCase()}`}>{p.lang}</span>
              <span className="proj__cat mono micro dim">{p.cat.toUpperCase()}</span>
            </div>
            <h3 className="proj__name">{p.name}</h3>
            <p className="proj__desc">{p.desc}</p>
            <div className="proj__foot">
              {p.extra ? <span className="mono micro dim">{p.extra}</span> : <span />}
              <span className="proj__arrow">↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Research({ d }) {
  return (
    <section className="block" id="research" data-screen-label="04 Research">
      <SectionHeader index={3} kicker="LAB" title="Research" />
      <div className="res-grid">
        {d.research.map((r, i) => (
          <Reveal key={r.title} delay={i * 100}>
            <article className="res-card">
              <div className="res-card__meta">
                <span className="mono micro dim">{r.span}</span>
                <span className="mono micro dim">{r.advisor}</span>
              </div>
              <h3 className="res-card__title">{r.title}</h3>
              <div className="res-card__role mono dim">{r.role}</div>
              <p className="res-card__detail">{r.detail}</p>
              <div className="res-card__tags">
                {r.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Timeline({ d }) {
  return (
    <section className="block" id="timeline" data-screen-label="05 Timeline">
      <SectionHeader index={4} kicker="LOG" title="Background" sub="Years, in reverse." />
      <ol className="tl">
        {d.timeline.map((t, i) => (
          <li key={i} className={`tl__row tl__row--${t.kind}`}>
            <span className="tl__year mono">{t.year}</span>
            <span className="tl__node" />
            <div className="tl__body">
              <h4 className="tl__title">{t.title}</h4>
              <p className="tl__detail">{t.detail}</p>
            </div>
            <span className="tl__kind mono micro dim">{t.kind.toUpperCase()}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Leadership({ d }) {
  return (
    <section className="block" id="leadership" data-screen-label="06 Leadership">
      <SectionHeader index={5} kicker="ORGS" title="Leadership at KAIST" sub="Student organizations I helped run." />
      <div className="org-grid">
        {d.orgs.map((o, i) => (
          <Reveal key={o.org} delay={i * 80}>
            <article className="org">
              <div className="org__head">
                <span className="mono micro dim">{o.span}</span>
                <span className="mono micro dim">KAIST</span>
              </div>
              <h3 className="org__org">{o.org}</h3>
              <div className="org__role">{o.role}</div>
              <p className="org__note">{o.note}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Stack({ d }) {
  return (
    <section className="block" id="stack" data-screen-label="07 Stack">
      <SectionHeader index={6} kicker="STACK" title="What I reach for" sub="" />
      <div className="stack">
        {Object.entries(d.stack).map(([group, items]) => (
          <div key={group} className="stack__group">
            <div className="stack__label mono micro dim">{group.toUpperCase()}</div>
            <div className="stack__items">
              {items.map((it) => (
                <span key={it} className="stack__chip">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact({ d }) {
  return (
    <section className="block contact" id="contact" data-screen-label="08 Contact">
      <SectionHeader index={7} kicker="EOF" title="Let's talk" sub="Best by email. I read everything." />
      <div className="contact__grid">
        <a className="contact__primary" href="mailto:skybluejacket@kaist.ac.kr">
          <span className="mono micro dim">PRIMARY</span>
          <span className="contact__email">skybluejacket@kaist.ac.kr</span>
          <span className="contact__cta mono">COMPOSE →</span>
        </a>
        <div className="contact__side">
          {d.socials
            .filter((s) => s.kind !== "email")
            .map((s) => (
              <a key={s.kind} className="contact__row" href={s.href} target="_blank" rel="noreferrer">
                <span className="mono micro dim">{s.short}</span>
                <span className="contact__handle">{s.label}</span>
                <span className="contact__arrow">↗</span>
              </a>
            ))}
        </div>
      </div>
      <footer className="footer">
        <span className="mono micro dim">© 2026 Aiden Kim · Daejeon, KR</span>
        <span className="mono micro dim">
          Last contact <Clock tz={d.identity.tz} />
        </span>
      </footer>
    </section>
  );
}
