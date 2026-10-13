// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import type { AppInfo } from "../config.js";
import { Footer, Layout, Nav } from "./layout.js";

const FEATURES = [
  { lbl: "Smart Scan", title: "One pass, one total", body: "Junk, duplicates, the Trash and memory in a single scan, with one number and one Clean for what's checked. It never empties the Trash." },
  { lbl: "Junk", title: "Only what rebuilds itself", body: "App caches, logs, Xcode and simulator data, npm, Homebrew and pip caches, node_modules, .venv and target folders, old installers. Only junk that comes back on its own is checked for you." },
  { lbl: "Large Files", title: "The big ones, by age", body: "Every big file in your home folder, filtered by size and by how long since you last touched it." },
  { lbl: "Space Lens", title: "Every folder, measured", body: "Biggest first, as a list or a map of tiles sized by what they hold. Open one to drill in." },
  { lbl: "Duplicates", title: "Byte-for-byte, oldest kept", body: "Identical files, hard links not counted. Extra copies are checked, the oldest stays, and Bilge won't remove every copy." },
  { lbl: "Photos", title: "Look-alikes, not just copies", body: "Resized and re-saved copies and near-identical shots taken moments apart, compared on your Mac with Vision. Never inside a Photos library." },
  { lbl: "Uninstall", title: "The app and what it left", body: "Removes an app plus its leftovers in ~/Library. Sort by when each was last opened to find the ones you never use." },
  { lbl: "Speed", title: "What's running, and why", body: "Open apps by memory with idle time, background jobs named for the app they belong to. Pause one, or set it aside and Undo later." },
  { lbl: "Care · Polish", title: "Routine upkeep, honest numbers", body: "Flush DNS, free memory, reindex Spotlight, thin Time Machine snapshots. Polish reports what it really freed, zero included." },
];

export const HomePage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout title={`${app.name} — ${app.tagline}`} description={app.description} url={app.url} image={`${app.url}/img/icon.png`}>
    <Nav />
    <main class="wrap">
      <div class="hero">
        <div>
          <div class="kicker">Mac cleaner · menu bar</div>
          <h1>Where did all your <em class="glow">disk space</em> go?</h1>
          <p class="lead">
            Bilge finds it: caches, build folders, big files, duplicates and the leftovers of apps you deleted years ago. It
            moves them to the Trash, so anything it got wrong can be put back with one keystroke.
          </p>
          <div class="cta">
            <a class="btn btn-teal" href="/download">Download free trial</a>
            <a class="btn btn-line" href="/buy">Buy · {app.price}</a>
          </div>
          <div class="req">{app.trialDays}-day free trial · {app.price} once, no subscription · {app.requires}</div>
        </div>
        <div>
          <div class="term">
            <div class="t"><span>Menu bar · ⌥⇧B</span><span>always on</span></div>
            <pre>
<span class="p">◔</span> <span class="k">MEM 64%</span>  ·  <span class="a">38 GB free</span>{"\n"}
  top memory  Google Chrome · 3.1 GB{"\n"}
{"\n"}
<span class="p">▸</span> <span class="k">Smart Scan</span>{"\n"}
<span class="p">▸</span> <span class="k">Polish</span>   <span class="a">freed 1.4 GB</span>{"\n"}
<span class="p">▸</span> <span class="k">Put Back Last Clean</span>   ⌥⌘Z{"\n"}
{"\n"}
<span class="a">⚠</span> free space under 10 GB? Bilge tells you.
            </pre>
          </div>
          <div class="cap">A twelve-tick memory dial and free space, always in view</div>
        </div>
      </div>
    </main>

    <section id="demo">
      <div class="wrap">
        <div class="kicker">Try it here</div>
        <h2>Run a Smart Scan</h2>
        <p class="sub">A working copy of Bilge's Smart Scan on a made-up Mac, in your browser. Scan, untick what you want to keep, Clean, then Put Back.</p>
        <div class="dm">
          <div class="dm-strip"><span class="brand">BILGE<span>//SCAN</span></span><span class="dm-tag">DEMO · SAMPLE DATA</span><span class="dm-clock">--:--:--</span></div>
          <div class="dm-body">
            <div class="dm-gauges">
              <div><div class="dm-lbl">To clean · GB</div><div class="dm-flap dm-sel">00.0</div></div>
              <div><div class="dm-lbl">Free · GB</div><div class="dm-flap dm-free amber">00.0</div></div>
              <div class="dm-disk" aria-hidden="true"><i class="used"></i><i class="junk"></i></div>
              <div class="dm-lbl">Macintosh HD · 494 GB</div>
            </div>
            <div class="dm-rows"></div>
          </div>
          <pre class="dm-out" aria-live="polite"></pre>
          <div class="dm-acts">
            <button type="button" class="go" data-act="scan">Scan</button>
            <button type="button" data-act="clean" disabled>Clean</button>
            <button type="button" data-act="back" disabled>Put Back ⌥⌘Z</button>
          </div>
        </div>
      </div>
    </section>

    <section id="features">
      <div class="wrap">
        <div class="kicker">What it does</div>
        <h2>Every corner your disk fills up</h2>
        <p class="sub">Storage settings tells you your disk is full. Bilge tells you which folders filled it, and clears the ones that are safe to clear.</p>
        <div class="grid">
          {FEATURES.map((f) => (
            <div class="cell">
              <div class="lbl">{f.lbl}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="safety">
      <div class="wrap split">
        <div>
          <div class="kicker">Nothing is gone for good</div>
          <h2>Cleaning you can undo</h2>
          <p class="sub">A cleaner that guesses wrong shouldn't cost you a file. Bilge is built so it can't.</p>
          <ul class="list">
            <li><b>Everything goes to the Trash.</b> Put Back Last Clean (⌥⌘Z) undoes the last one. Empty Trash is the only thing that deletes, and it asks first.</li>
            <li><b>Changed since the scan?</b> A duplicate that changed after it was scanned is never removed.</li>
            <li><b>Running apps are left alone.</b> Uninstall refuses while the app is open.</li>
            <li><b>Never show it again.</b> Right-click any file to Quick Look it or hide it from every future scan.</li>
          </ul>
        </div>
        <div class="term">
          <div class="t"><span>Left out, on purpose</span><span>by design</span></div>
          <pre>
<span class="a">✕</span> <span class="k">malware scanner</span>{"\n"}
  macOS's XProtect already does that{"\n"}
<span class="a">✕</span> <span class="k">file shredder</span>{"\n"}
  secure erase does nothing on an SSD{"\n"}
<span class="a">✕</span> <span class="k">language file stripping</span>{"\n"}
  breaks apps' code signatures{"\n"}
<span class="a">✕</span> <span class="k">app updater</span>{"\n"}
  your apps already update themselves
          </pre>
        </div>
      </div>
    </section>

    <section id="tweaks">
      <div class="wrap split">
        <div>
          <div class="kicker">Settings › Tweaks</div>
          <h2>Small fixes for the rest of macOS</h2>
          <p class="sub">A drawer of tweaks for Finder, windows, the Dock, apps and the keyboard. Each is off until you turn it on, and turning it off puts back what it changed.</p>
          <ul class="list">
            <li><b>Finder:</b> cut and paste files, Return to open, Delete to trash, copy path, open Terminal here.</li>
            <li><b>Windows and Dock:</b> click the active app to hide it, minimize all, no Dock delay, Dock spacers.</li>
            <li><b>Apps:</b> auto-quit apps you've left idle, guard ⌘Q and ⌘W, launch any app with a shortcut.</li>
            <li><b>Keyboard and more:</b> a Hyper key, text and QR capture, a color picker, Cleaning and Cat Mode.</li>
          </ul>
        </div>
        <div class="term">
          <div class="t"><span>Tweaks</span><span>each one off by default</span></div>
          <pre>
<span class="p">[x]</span> <span class="k">Cut and paste files</span>      ⌘X ⌘V{"\n"}
<span class="p">[x]</span> <span class="k">Return opens the file</span>{"\n"}
<span class="p">[ ]</span> <span class="k">Delete moves to the Trash</span>{"\n"}
<span class="p">[x]</span> <span class="k">Hyper key</span>                Caps Lock{"\n"}
<span class="p">[ ]</span> <span class="k">Auto-quit idle apps</span>      1 h{"\n"}
<span class="p">[x]</span> <span class="k">Guard ⌘Q</span>                 press twice{"\n"}
<span class="p">[ ]</span> <span class="k">Cat Mode</span>                 <span class="a">keyboard off</span>
          </pre>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="kicker">Versus the built-in tool</div>
        <h2>What Storage settings doesn't do</h2>
        <div class="cmp">
          <div class="h"> </div><div class="h us">Bilge</div><div class="h">Storage settings</div>
          <div>Project build folders (node_modules, target, .venv)</div><div class="y">Yes</div><div class="n">No</div>
          <div>Byte-for-byte duplicates</div><div class="y">Yes</div><div class="n">No</div>
          <div>Look-alike photos outside Photos</div><div class="y">Yes</div><div class="n">No</div>
          <div>App leftovers removed with the app</div><div class="y">Yes</div><div class="n">No</div>
          <div>A map of every folder's size</div><div class="y">Space Lens</div><div class="n">No</div>
          <div>Undo the last clean</div><div class="y">⌥⌘Z</div><div class="n">No</div>
          <div>Free space in the menu bar</div><div class="y">Yes</div><div class="n">No</div>
          <div>Price</div><div class="y">{app.price} once</div><div class="n">Free, built in</div>
        </div>
      </div>
    </section>

    <section id="pricing">
      <div class="wrap">
        <div class="price">
          <div class="kicker">One price</div>
          <div class="amt">{app.price}<small> once</small></div>
          <ul class="list">
            <li>Every feature free for {app.trialDays} days, no account, no card</li>
            <li>After the trial, scanning, the menu bar, Speed, Care, Polish and Put Back stay free forever</li>
            <li>A license unlocks cleaning what Bilge finds, Uninstall and Tweaks</li>
            <li>Free updates; your key lives on your shafer.llc account and comes straight back to the app after checkout</li>
          </ul>
          <div class="cta">
            <a class="btn btn-teal" href="/download">Download free trial</a>
            <a class="btn btn-line" href="/buy">Buy · {app.price}</a>
          </div>
          <div class="req">{app.requires}</div>
        </div>
      </div>
    </section>

    <section class="faq">
      <div class="wrap">
        <h2>Questions</h2>
        <details><summary>What happens when the trial ends?</summary>
          <p>Scans, the menu bar, Speed, Care, Polish and Put Back keep working, free. Moving what Bilge finds to the Trash (Clean, Uninstall and the Trash buttons in each list) and turning on Tweaks ask for a license.</p></details>
        <details><summary>Could Bilge delete something I need?</summary>
          <p>It only moves things to the Trash, and Put Back Last Clean (⌥⌘Z) undoes the last clean. Only junk that rebuilds itself is checked for you; everything else waits for you to tick it.</p></details>
        <details><summary>Why does it want Full Disk Access?</summary>
          <p>macOS hides Mail attachments, device backups and the Trash itself from apps without it. Bilge works without it and tells you what it can't see, with a link to the setting.</p></details>
        <details><summary>Does Bilge send my files anywhere?</summary>
          <p>No. Scans, photo comparisons and everything else run on your Mac. It only goes online to check your license with shafer.llc and to check for updates.</p></details>
        <details><summary>Can I use my license on another Mac?</summary>
          <p>Yes. On the new Mac, click Buy in Settings › License and sign in; your key comes back without paying again. Your shafer.llc account lists every Mac using it.</p></details>
        <details><summary>Intel Macs?</summary>
          <p>Yes. Bilge is a universal app for Apple silicon and Intel, on macOS 14 or later.</p></details>
      </div>
    </section>
    <Footer version={app.version} />
    <script src="/demo.js" defer></script>
  </Layout>
);
