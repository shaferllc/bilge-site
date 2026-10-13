// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC, PropsWithChildren } from "hono/jsx";

// Bilge's own look, taken from its icon: a deep-navy hull, cyan bilge water and the yellow pump
// arrow, over a pale sea-foam page. Rounded, buoyant shapes; Bricolage for display, Plex Mono for figures.
const STYLES = `
  :root {
    --navy: #0b2440; --navy-2: #123a5f; --navy-3: #1d5d8c;
    --water: #5fd4e0; --water-2: #2bb3c7; --water-3: #138a9e; --kept: #9fb3c4;
    --sun: #f6b94a; --sun-2: #e59d1c;
    --foam: #f3f8fa; --card: #ffffff; --line: #dbe6ec;
    --ink: #0b2440; --ink-2: #3f5a72; --ink-3: #6f8597;
    --display: "Bricolage Grotesque", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --sans: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif;
    --mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  body { margin: 0; background: var(--foam); color: var(--ink); font-family: var(--sans); line-height: 1.6; -webkit-font-smoothing: antialiased; }
  a { color: inherit; text-decoration: none; }
  ::selection { background: rgba(95,212,224,.4); }
  .wrap { max-width: 70rem; margin: 0 auto; padding: 0 1.25rem; }
  .mono { font-family: var(--mono); }
  button:focus-visible, a:focus-visible, input:focus-visible { outline: 3px solid var(--sun); outline-offset: 2px; }

  /* Header floats on the navy hero, then goes solid. */
  header.bar { position: sticky; top: 0; z-index: 30; background: rgba(11,36,64,.92); backdrop-filter: blur(12px); color: #fff; }
  .bar .row { display: flex; align-items: center; justify-content: space-between; height: 4rem; }
  .brand { display: flex; align-items: center; gap: .6rem; font-family: var(--display); font-weight: 800; font-size: 1.35rem; letter-spacing: -0.02em; }
  .brand img { width: 2rem; height: 2rem; }
  .bar nav { display: flex; gap: 1.5rem; align-items: center; font-size: .92rem; font-weight: 500; color: #c9dbe8; }
  .bar nav a:not(.btn):hover { color: #fff; }

  .btn { display: inline-flex; align-items: center; gap: .5rem; font-family: var(--display); font-size: 1rem; font-weight: 700; padding: .8rem 1.4rem; border-radius: 999px; border: 2px solid transparent; background: transparent; color: inherit; transition: transform .15s, box-shadow .15s, background .15s; cursor: pointer; }
  .btn:hover { transform: translateY(-2px); }
  .btn-sun { background: var(--sun); color: var(--navy); box-shadow: 0 8px 24px -8px rgba(246,185,74,.8); }
  .btn-sun:hover { background: #ffc862; }
  .btn-ghost { color: #fff; border-color: rgba(255,255,255,.35); }
  .btn-ghost:hover { border-color: #fff; }
  .btn-navy { background: var(--navy); color: #fff; }
  .btn-sm { padding: .45rem 1rem; font-size: .88rem; }

  /* Hero: the deep, with a waterline into the page. */
  .deep { background: radial-gradient(90% 70% at 80% 10%, var(--navy-3), transparent 70%), linear-gradient(180deg, var(--navy) 0%, var(--navy-2) 100%); color: #fff; position: relative; }
  .hero { display: grid; grid-template-columns: 1.05fr 1fr; gap: 3rem; align-items: center; padding-top: 4.5rem; padding-bottom: 3rem; }
  .eyebrow { display: inline-flex; align-items: center; gap: .5rem; font-family: var(--mono); font-size: .78rem; letter-spacing: .08em; text-transform: uppercase; color: var(--water); }
  .eyebrow::before { content: ""; width: .55rem; height: .55rem; border-radius: 50%; background: var(--water); box-shadow: 0 0 0 4px rgba(95,212,224,.2); }
  h1, h2, h3 { font-family: var(--display); letter-spacing: -0.03em; }
  .hero h1 { font-size: clamp(2.7rem, 6vw, 4.6rem); line-height: .98; margin: 1rem 0 1.3rem; font-weight: 800; }
  .hero h1 em { font-style: normal; color: var(--sun); position: relative; white-space: nowrap; }
  .hero h1 em::after { content: ""; position: absolute; left: 0; right: 0; bottom: -.08em; height: .14em; border-radius: 99px; background: var(--water); opacity: .9; }
  .hero .lead { font-size: 1.15rem; color: #c9dbe8; max-width: 31rem; margin: 0 0 2rem; }
  .cta { display: flex; gap: .8rem; flex-wrap: wrap; }
  .req { margin-top: 1.1rem; font-size: .85rem; color: #93adc2; }
  .waterline { display: block; width: 100%; height: 70px; margin-top: -1px; }

  section { padding: 5rem 0; }
  .kicker { font-family: var(--mono); font-size: .78rem; letter-spacing: .08em; text-transform: uppercase; color: var(--water-3); font-weight: 600; }
  h2 { font-size: clamp(2rem, 4vw, 3rem); line-height: 1.05; margin: .5rem 0 1rem; font-weight: 800; }
  .sub { color: var(--ink-2); max-width: 40rem; margin: 0 0 2.6rem; font-size: 1.1rem; }

  /* The hull demo. */
  .hull-card { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.14); border-radius: 28px; padding: 1.5rem; backdrop-filter: blur(6px); }
  .hull-top { display: flex; justify-content: space-between; align-items: center; font-family: var(--mono); font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: #93adc2; margin-bottom: 1rem; }
  .hull-top b { color: var(--sun); font-weight: 600; }
  .hull-stage { position: relative; display: grid; place-items: center; padding-top: 2.4rem; }
  .pump { position: absolute; top: 0; left: 50%; width: 2.6rem; margin-left: -1.3rem; opacity: 0; transform: translateY(40px); transition: opacity .3s, transform .9s cubic-bezier(.2,.8,.2,1); }
  .pump.go { opacity: 1; transform: translateY(-10px); }
  .hull { width: min(100%, 17rem); height: 11.5rem; border: 9px solid #fff; border-top: 0; border-radius: 0 0 50% 50% / 0 0 46% 46%; overflow: hidden; display: flex; flex-direction: column-reverse; background: rgba(255,255,255,.04); }
  .stratum { flex: none; height: 0; transition: height .8s cubic-bezier(.3,.7,.2,1), background .3s; position: relative; }
  .stratum.on { background: var(--water-2); } .stratum.on:nth-child(even) { background: var(--water); }
  .stratum.kept { background: var(--kept); } .stratum.kept:nth-child(even) { background: #b6c6d3; }
  .stratum.hot { filter: brightness(1.12); }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: .6rem; margin-top: 1.2rem; }
  .stat { background: rgba(0,0,0,.18); border-radius: 14px; padding: .7rem .8rem; }
  .stat small { display: block; font-size: .68rem; letter-spacing: .06em; text-transform: uppercase; color: #93adc2; }
  .stat b { font-family: var(--mono); font-size: 1.35rem; font-weight: 600; font-variant-numeric: tabular-nums; }
  .stat.sun b { color: var(--sun); } .stat.water b { color: var(--water); }
  .layers { list-style: none; margin: 1rem 0 0; padding: 0; display: grid; gap: 2px; max-height: 12.5rem; overflow: auto; }
  .layers label { display: grid; grid-template-columns: 1rem .7rem 1fr auto; gap: .6rem; align-items: center; padding: .35rem .5rem; border-radius: 8px; font-size: .86rem; cursor: pointer; }
  .layers label:hover { background: rgba(255,255,255,.07); }
  .layers input { accent-color: var(--sun); margin: 0; width: 1rem; height: 1rem; }
  .layers .sw { width: .7rem; height: .7rem; border-radius: 3px; background: var(--kept); }
  .layers .on .sw { background: var(--water); }
  .layers .gone { opacity: .4; text-decoration: line-through; }
  .layers small { color: #93adc2; }
  .layers .v { font-family: var(--mono); font-size: .8rem; color: #c9dbe8; font-variant-numeric: tabular-nums; }
  .say { min-height: 2.8rem; margin: .9rem 0; font-size: .88rem; color: #c9dbe8; }
  .say b { color: var(--sun); font-weight: 600; }
  .hull-acts { display: flex; gap: .5rem; flex-wrap: wrap; }
  .hull-acts .btn { font-size: .9rem; padding: .55rem 1.1rem; }
  .hull-acts .btn:disabled { opacity: .35; cursor: default; transform: none; }

  /* Features: a grid of cards with a water-level bar. */
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; }
  .card { background: var(--card); border: 1px solid var(--line); border-radius: 22px; padding: 1.6rem; position: relative; overflow: hidden; box-shadow: 0 1px 0 rgba(11,36,64,.04), 0 12px 30px -20px rgba(11,36,64,.25); transition: transform .2s; }
  .card:hover { transform: translateY(-3px); }
  .card::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 6px; background: linear-gradient(90deg, var(--water-2), var(--water)); transform: scaleX(.18); transform-origin: left; transition: transform .4s; }
  .card:hover::after { transform: scaleX(1); }
  .card .lbl { font-family: var(--mono); font-size: .72rem; letter-spacing: .06em; text-transform: uppercase; color: var(--water-3); font-weight: 600; }
  .card h3 { margin: .45rem 0 .5rem; font-size: 1.3rem; line-height: 1.15; }
  .card p { margin: 0; color: var(--ink-2); font-size: .97rem; }

  /* Safety: the four steps, as a voyage. */
  .voyage { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; counter-reset: step; }
  .leg { background: var(--card); border: 1px solid var(--line); border-radius: 22px; padding: 1.4rem; position: relative; }
  .leg::before { counter-increment: step; content: counter(step); display: grid; place-items: center; width: 2.2rem; height: 2.2rem; border-radius: 50%; background: var(--navy); color: var(--sun); font-family: var(--display); font-weight: 800; margin-bottom: .8rem; }
  .leg h3 { margin: 0 0 .35rem; font-size: 1.15rem; }
  .leg p { margin: 0; color: var(--ink-2); font-size: .94rem; }
  .leg kbd { font-family: var(--mono); font-size: .8rem; background: var(--foam); border: 1px solid var(--line); border-radius: 6px; padding: .05rem .35rem; }
  .leg.warn::before { background: var(--sun); color: var(--navy); }
  .omit { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 2.6rem; }
  .omit div { border: 2px dashed var(--line); border-radius: 18px; padding: 1.1rem 1.2rem; }
  .omit b { display: block; font-family: var(--display); font-size: 1.05rem; text-decoration: line-through; text-decoration-color: var(--sun-2); text-decoration-thickness: 3px; }
  .omit span { color: var(--ink-3); font-size: .9rem; }

  /* Tweaks: real-looking switches. */
  .tide { background: linear-gradient(180deg, #e6f4f7, var(--foam)); }
  .split { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
  .ticks { list-style: none; padding: 0; margin: 0; display: grid; gap: .75rem; }
  .ticks li { padding-left: 1.9rem; position: relative; color: var(--ink-2); }
  .ticks li::before { content: ""; position: absolute; left: 0; top: .3rem; width: 1.15rem; height: 1.15rem; border-radius: 50%; background: var(--water) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 8.5l2.5 2.5L12 5.5' fill='none' stroke='%230b2440' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 80% no-repeat; }
  .ticks b { color: var(--ink); }
  .panel { background: var(--card); border: 1px solid var(--line); border-radius: 24px; padding: .6rem 1.2rem; box-shadow: 0 24px 50px -30px rgba(11,36,64,.35); }
  .sw-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .8rem 0; border-bottom: 1px solid var(--line); }
  .sw-row:last-child { border-bottom: 0; }
  .sw-row small { display: block; color: var(--ink-3); font-size: .82rem; }
  .switch { appearance: none; -webkit-appearance: none; flex: none; width: 2.9rem; height: 1.7rem; border-radius: 99px; background: #cfdbe3; position: relative; cursor: pointer; transition: background .2s; margin: 0; }
  .switch::after { content: ""; position: absolute; top: 3px; left: 3px; width: calc(1.7rem - 6px); height: calc(1.7rem - 6px); border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.25); transition: transform .2s; }
  .switch:checked { background: var(--water-2); }
  .switch:checked::after { transform: translateX(1.2rem); }

  /* Comparison. */
  .cmp { width: 100%; border-collapse: separate; border-spacing: 0; background: var(--card); border: 1px solid var(--line); border-radius: 22px; overflow: hidden; font-size: .97rem; }
  .cmp th, .cmp td { padding: .9rem 1.1rem; text-align: left; border-bottom: 1px solid var(--line); }
  .cmp tr:last-child td { border-bottom: 0; }
  .cmp th { font-family: var(--mono); font-size: .74rem; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-3); background: #f8fbfc; font-weight: 600; }
  .cmp th.us { color: var(--water-3); }
  .cmp .y { color: var(--water-3); font-weight: 600; } .cmp .n { color: var(--ink-3); }

  /* Pricing. */
  .price { max-width: 34rem; margin: 0 auto; text-align: center; background: var(--navy); color: #fff; border-radius: 32px; padding: 3rem 2.2rem; position: relative; overflow: hidden; }
  .price::after { content: ""; position: absolute; left: -10%; right: -10%; bottom: -3.5rem; height: 6rem; background: var(--water-2); border-radius: 50%; opacity: .35; }
  .price > * { position: relative; z-index: 1; }
  .price .kicker { color: var(--water); }
  .price .amt { font-family: var(--display); font-size: 5rem; font-weight: 800; color: var(--sun); line-height: 1; letter-spacing: -0.04em; margin: .6rem 0 0; }
  .price .amt small { font-size: 1.1rem; color: #93adc2; font-weight: 600; letter-spacing: 0; }
  .price .ticks { text-align: left; margin: 1.8rem 0 2rem; }
  .price .ticks li { color: #c9dbe8; }
  .price .cta { justify-content: center; }
  .price .req { color: #93adc2; }

  .faq { max-width: 46rem; }
  .faq details { background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: 1rem 1.3rem; margin-bottom: .7rem; }
  .faq summary { cursor: pointer; font-weight: 600; list-style: none; display: flex; justify-content: space-between; gap: 1rem; }
  .faq summary::-webkit-details-marker { display: none; }
  .faq summary::after { content: "+"; font-family: var(--display); font-weight: 800; color: var(--water-3); font-size: 1.3rem; line-height: 1; }
  .faq details[open] summary::after { content: "–"; }
  .faq p { color: var(--ink-2); margin: .6rem 0 0; }

  .prose { max-width: 44rem; padding: 3.5rem 1.25rem; color: var(--ink-2); }
  .prose h1 { color: var(--ink); font-size: 2.6rem; }
  .prose h2 { font-size: 1.4rem; margin-top: 2rem; color: var(--ink); }
  .prose a { color: var(--water-3); text-decoration: underline; }

  footer { background: var(--navy); color: #93adc2; padding: 2.4rem 0; font-size: .9rem; }
  footer .row { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; align-items: center; }
  footer nav { display: flex; gap: 1.4rem; }
  footer a:hover { color: #fff; }
  footer .brand { color: #fff; font-size: 1.1rem; }
  footer .brand img { width: 1.6rem; height: 1.6rem; }

  @media (max-width: 56rem) {
    .hero, .split { grid-template-columns: 1fr; }
    .grid { grid-template-columns: 1fr 1fr; }
    .voyage, .omit { grid-template-columns: 1fr 1fr; }
    .bar nav .hidesm { display: none; }
  }
  @media (max-width: 36rem) {
    .grid, .voyage, .omit { grid-template-columns: 1fr; }
    .cmp { font-size: .86rem; } .cmp th, .cmp td { padding: .7rem .6rem; }
    .stat b { font-size: 1.1rem; }
  }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
`;

export const Nav: FC = () => (
  <header class="bar">
    <div class="wrap row">
      <a class="brand" href="/"><img src="/img/icon.png" width="32" height="32" alt="" />Bilge</a>
      <nav>
        <a class="hidesm" href="/#features">Features</a>
        <a class="hidesm" href="/#safety">Safety</a>
        <a class="hidesm" href="/#tweaks">Tweaks</a>
        <a href="/#pricing">Pricing</a>
        <a class="btn btn-sun btn-sm" href="/download">Download</a>
      </nav>
    </div>
  </header>
);

export const Footer: FC<{ version: string }> = ({ version }) => (
  <footer>
    <div class="wrap row">
      <a class="brand" href="/"><img src="/img/icon.png" width="26" height="26" alt="" />Bilge</a>
      <span>v{version} · made by Tom Shafer · sister ship of <a href="https://binnacle.shafer.llc">Binnacle</a></span>
      <nav>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/buy">Buy</a>
      </nav>
    </div>
  </footer>
);

export const Layout: FC<PropsWithChildren<{ title: string; description: string; url?: string; image?: string }>> = (
  { title, description, url, image, children },
) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content="summary" />
      <meta name="theme-color" content="#0b2440" />
      <link rel="icon" type="image/png" href="/img/icon.png" />
      <link rel="apple-touch-icon" href="/img/icon.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    </head>
    <body>{children}</body>
  </html>
);
