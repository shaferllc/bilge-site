// The hero's Smart Scan demo: a scan fills the hull layer by layer, Pump out sends the checked
// layers to the Trash, Put Back pours them in again. Sample data only; nothing reads the visitor's Mac.
(() => {
  const root = document.getElementById("demo");
  if (!root) return;
  const $ = (s) => root.querySelector(s);

  const FREE = 38.4, CAPACITY = 64; // GB that fills the hull to the brim
  // `on` mirrors the app: only what rebuilds itself (and extra duplicate copies) is checked for you.
  const ITEMS = [
    { name: "Xcode DerivedData", note: "rebuilds", gb: 18.6, on: true },
    { name: "node_modules ×14", note: "npm install", gb: 6.3, on: true },
    { name: "App caches", note: "rebuilds", gb: 4.2, on: true },
    { name: "npm, Homebrew, pip", note: "rebuilds", gb: 3.4, on: true },
    { name: "Duplicates ×212", note: "oldest kept", gb: 1.8, on: true },
    { name: "Logs", note: "rebuilds", gb: 0.9, on: true },
    { name: "Old installers", note: "your call", gb: 2.7, on: false },
    { name: "iPhone backups", note: "your call", gb: 22.1, on: false },
  ];
  const hull = $(".hull"), list = $(".layers"), out = $(".say"), pump = $(".pump");
  const fSel = $(".d-sel"), fTrash = $(".d-trash"), fFree = $(".d-free");
  const btn = (a) => root.querySelector('[data-act="' + a + '"]');
  const gb = (n) => n.toFixed(1) + " GB";
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let items, trash, last, scanned, busy;
  const reset = () => {
    items = ITEMS.map((x) => ({ ...x, seen: false, gone: false }));
    trash = 3.2; last = null; scanned = false; busy = false;
  };
  reset();

  // One layer per item, made once so height changes animate.
  const layers = ITEMS.map(() => hull.appendChild(document.createElement("div")));
  const selected = () => items.filter((x) => x.on && !x.gone).reduce((s, x) => s + x.gb, 0);

  function render() {
    items.forEach((x, i) => {
      const el = layers[i];
      el.className = "stratum " + (x.on ? "on" : "kept");
      el.style.order = x.on ? 1 : 0; // what you keep settles at the bottom
      el.style.height = x.seen && !x.gone ? (x.gb / CAPACITY) * 100 + "%" : "0";
    });
    list.innerHTML = items.map((x, i) =>
      '<li><label class="' + (x.on ? "on" : "") + (x.gone ? " gone" : "") + '" data-i="' + i + '">' +
      '<input type="checkbox" data-i="' + i + '"' + (x.on ? " checked" : "") + (x.gone || !scanned || busy ? " disabled" : "") + ">" +
      '<span class="sw"></span><span>' + x.name + " <small>· " + x.note + '</small></span><span class="v">' + (x.seen ? gb(x.gb) : "—") + "</span></label></li>").join("");
    const sel = items.filter((x) => x.on && x.seen && !x.gone).reduce((s, x) => s + x.gb, 0);
    fSel.textContent = sel.toFixed(1);
    fTrash.textContent = trash.toFixed(1);
    fFree.textContent = FREE.toFixed(1); // cleaned files sit in the Trash; free space moves when it's emptied
    btn("scan").disabled = busy;
    btn("clean").disabled = busy || !scanned || sel === 0;
    btn("back").disabled = busy || !last;
  }
  const say = (html) => { out.innerHTML = html; };

  function scan() {
    reset(); busy = true; render();
    say("Sounding the hull: caches, build folders, duplicates, the Trash…");
    let i = 0;
    const step = () => {
      if (i === items.length) {
        busy = false; scanned = true; render();
        return say("<b>" + gb(selected()) + "</b> checked to pump out. Untick anything to keep it. Backups and installers wait for you.");
      }
      items[i++].seen = true; render();
      setTimeout(step, still ? 0 : 260);
    };
    step();
  }

  function clean() {
    const go = items.filter((x) => x.on && !x.gone);
    const n = go.reduce((s, x) => s + x.gb, 0);
    go.forEach((x) => { x.gone = true; });
    trash += n; last = go; render();
    pump.classList.remove("go"); void pump.offsetWidth; pump.classList.add("go");
    setTimeout(() => pump.classList.remove("go"), 1400);
    say("Pumped <b>" + gb(n) + "</b> into the Trash. Nothing is deleted until you empty it; Put Back undoes this.");
  }

  function back() {
    const n = last.reduce((s, x) => s + x.gb, 0);
    last.forEach((x) => { x.gone = false; });
    trash -= n; last = null; render();
    say("Put back " + gb(n) + ". Every file is where it was.");
  }

  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (b && !b.disabled) ({ scan, clean, back })[b.dataset.act]();
  });
  list.addEventListener("change", (e) => {
    const x = items[+e.target.dataset.i];
    if (x) { x.on = e.target.checked; render(); }
  });
  // Hovering a row lights its layer in the hull.
  list.addEventListener("mouseover", (e) => {
    const l = e.target.closest("[data-i]");
    layers.forEach((el, i) => el.classList.toggle("hot", !!l && +l.dataset.i === i));
  });
  list.addEventListener("mouseleave", () => layers.forEach((el) => el.classList.remove("hot")));
  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.metaKey && e.code === "KeyZ" && last && !busy) { e.preventDefault(); back(); }
  });

  render();
  say("A pretend Mac with " + FREE + " GB free. Press <b>Scan</b>.");
})();
