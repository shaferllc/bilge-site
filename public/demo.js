// The homepage's live Smart Scan demo: a made-up Mac, a scan that fills in row by row, Clean and Put Back.
// Everything runs in the browser on sample data; nothing reads the visitor's machine.
(() => {
  const root = document.getElementById("demo");
  if (!root) return;
  const $ = (s) => root.querySelector(s);

  const DISK = 494, FREE = 38.4;
  // `on` mirrors the app: only what rebuilds itself (and extra duplicate copies) is checked for you.
  const ITEMS = [
    { name: "Xcode DerivedData and simulators", note: "rebuilds itself", gb: 18.6, on: true },
    { name: "node_modules in 14 projects", note: "npm install brings it back", gb: 6.3, on: true },
    { name: "App caches", note: "rebuilds itself", gb: 4.2, on: true },
    { name: "npm, Homebrew and pip caches", note: "rebuilds itself", gb: 3.4, on: true },
    { name: "Duplicates · 212 extra copies", note: "oldest of each kept", gb: 1.8, on: true },
    { name: "Logs", note: "rebuilds itself", gb: 0.9, on: true },
    { name: "Old installers in Downloads", note: "yours to decide", gb: 2.7, on: false },
    { name: "iPhone backups", note: "yours to decide", gb: 22.1, on: false },
  ];
  let items, trash, last, scanned, busy;
  const reset = () => {
    items = ITEMS.map((x) => ({ ...x, seen: 0, gone: false }));
    trash = 3.2; last = null; scanned = false; busy = false;
  };
  reset();

  const rows = $(".dm-rows"), out = $(".dm-out"), clock = $(".dm-clock");
  const flapSel = $(".dm-sel"), flapFree = $(".dm-free"), used = $(".dm-disk .used"), junk = $(".dm-disk .junk");
  const btn = (a) => root.querySelector('[data-act="' + a + '"]');
  const say = (html) => { out.innerHTML = html; };
  const gb = (n) => n.toFixed(1) + " GB";
  const live = () => items.filter((x) => !x.gone);
  const selected = () => live().filter((x) => x.on).reduce((s, x) => s + x.gb, 0);

  function render() {
    rows.innerHTML = items.map((x, i) =>
      '<label class="dm-row' + (x.gone ? " gone" : "") + '">' +
      '<input type="checkbox" data-i="' + i + '"' + (x.on ? " checked" : "") + (x.gone || !scanned ? " disabled" : "") + ">" +
      '<span class="n">' + x.name + " <small>· " + x.note + "</small></span>" +
      '<span class="v' + (x.on && !x.gone && x.seen ? " on" : "") + '">' + (x.seen ? gb(x.seen) : "—") + "</span></label>").join("") +
      '<label class="dm-row"><span></span><span class="n">Trash <small>· Empty Trash asks first</small></span><span class="v">' + gb(trash) + "</span></label>";
    const sel = scanned ? selected() : items.reduce((s, x) => s + (x.on ? x.seen : 0), 0);
    flapSel.textContent = sel.toFixed(1).padStart(4, "0");
    flapFree.textContent = FREE.toFixed(1); // cleaned files sit in the Trash, so free space only moves when it is emptied
    used.style.width = ((DISK - FREE - sel) / DISK) * 100 + "%";
    junk.style.width = (sel / DISK) * 100 + "%";
    btn("scan").disabled = busy;
    btn("clean").disabled = busy || !scanned || sel === 0;
    btn("back").disabled = busy || !last;
    clock.textContent = new Date().toTimeString().slice(0, 8);
  }

  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function scan() {
    reset(); busy = true; render();
    say('<span class="p">scanning</span> caches, build folders, duplicates, the Trash…');
    let i = 0;
    const step = () => {
      if (i === items.length) {
        busy = false; scanned = true; render();
        return say('<span class="a">' + gb(selected()) + "</span> checked to clean, " + gb(items.reduce((s, x) => s + x.gb, 0)) +
          ' found.\n<span class="dim">untick anything to keep it, then</span> Clean<span class="dim">. backups and installers wait for you to tick them.</span>');
      }
      items[i].seen = items[i].gb; i++; render();
      setTimeout(step, still ? 0 : 280);
    };
    step();
  }

  function clean() {
    const go = live().filter((x) => x.on);
    const n = go.reduce((s, x) => s + x.gb, 0);
    go.forEach((x) => { x.gone = true; });
    trash += n; last = go; render();
    say("moved " + go.length + ' items to the Trash · <span class="a">' + gb(n) + "</span>\n" +
      '<span class="dim">nothing is deleted until you empty the Trash.</span> Put Back <span class="dim">undoes it.</span>');
  }

  function back() {
    const n = last.reduce((s, x) => s + x.gb, 0);
    last.forEach((x) => { x.gone = false; });
    trash -= n; last = null; render();
    say("put back " + gb(n) + ". every file is where it was.");
  }

  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b || b.disabled) return;
    ({ scan, clean, back })[b.dataset.act]();
  });
  rows.addEventListener("change", (e) => {
    const x = items[+e.target.dataset.i];
    if (x) { x.on = e.target.checked; render(); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.metaKey && e.code === "KeyZ" && last && !busy) { e.preventDefault(); back(); }
  });

  render();
  say('press <span class="p">Scan</span>. this is a pretend Mac with ' + FREE + " GB free.");
  setInterval(() => { clock.textContent = new Date().toTimeString().slice(0, 8); }, 1000);
})();
