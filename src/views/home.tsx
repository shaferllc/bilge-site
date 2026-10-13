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
  { lbl: "Menu bar", title: "Free space, always in view", body: "A twelve-tick memory dial, free disk space and the top memory user, with a warning when space drops below a line you pick." },
];

const TWEAKS = [
  { name: "Cut and paste files", note: "⌘X, then ⌘V moves them", on: true },
  { name: "Return opens the file", note: "⇧Return or F2 renames", on: true },
  { name: "Hyper key", note: "Caps Lock becomes ⌃⌥⇧⌘", on: false },
  { name: "Auto-quit idle apps", note: "per-app rules, pauses on calls", on: false },
  { name: "Guard ⌘Q", note: "press twice to quit", on: true },
  { name: "Cat Mode", note: "the keyboard ignores paws", on: false },
];

const PUMP =
  '<svg viewBox="0 0 40 52" aria-hidden="true"><path d="M20 4 L36 22 H26 V48 H14 V22 H4 Z" fill="#f6b94a" stroke="#0b2440" stroke-width="2" stroke-linejoin="round"/></svg>';

const WATERLINE =
  '<svg class="waterline" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">' +
  '<path d="M0 0 H1440 V30 C1200 70 960 0 720 30 S240 70 0 30 Z" fill="#123a5f"/>' +
  '<path d="M0 46 C240 18 480 70 720 46 S1200 18 1440 46 V70 H0 Z" fill="#5fd4e0" opacity=".35"/>' +
  '<path d="M0 56 C240 36 480 76 720 56 S1200 36 1440 56 V70 H0 Z" fill="#f3f8fa"/></svg>';

export const HomePage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout title={`${app.name} — ${app.tagline}`} description={app.description} url={app.url} image={`${app.url}/img/icon.png`}>
    <Nav />
    <div class="deep">
      <div class="wrap hero">
        <div>
          <div class="eyebrow">A Mac cleaner you can undo</div>
          <h1>Where did all your <em>disk space</em> go?</h1>
          <p class="lead">
            It pooled at the bottom: caches, build folders, big files, duplicates and the leftovers of apps you deleted years
            ago. Bilge pumps it out, into the Trash, so anything it got wrong comes back with one keystroke.
          </p>
          <div class="cta">
            <a class="btn btn-sun" href="/download">Download free trial</a>
            <a class="btn btn-ghost" href="/buy">Buy · {app.price}</a>
          </div>
          <div class="req">{app.trialDays} days free · {app.price} once, no subscription · {app.requires}</div>
        </div>

        <div class="hull-card" id="demo">
          <div class="hull-top"><span>Smart Scan · sample Mac</span><b>try it</b></div>
          <div class="hull-stage">
            <div class="pump" dangerouslySetInnerHTML={{ __html: PUMP }} />
            <div class="hull" aria-hidden="true"></div>
          </div>
          <div class="stats">
            <div class="stat sun"><small>To pump</small><b class="d-sel">0.0</b></div>
            <div class="stat water"><small>In Trash</small><b class="d-trash">3.2</b></div>
            <div class="stat"><small>Free GB</small><b class="d-free">38.4</b></div>
          </div>
          <ul class="layers"></ul>
          <div class="say" aria-live="polite"></div>
          <div class="hull-acts">
            <button type="button" class="btn btn-sun" data-act="scan">Scan</button>
            <button type="button" class="btn btn-ghost" data-act="clean" disabled>Pump out</button>
            <button type="button" class="btn btn-ghost" data-act="back" disabled>Put Back ⌥⌘Z</button>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: WATERLINE }} />
    </div>

    <section id="features">
      <div class="wrap">
        <div class="kicker">What it finds</div>
        <h2>Every corner your disk fills up</h2>
        <p class="sub">Storage settings tells you your disk is full. Bilge tells you which folders filled it, and clears the ones that are safe to clear.</p>
        <div class="grid">
          {FEATURES.map((f) => (
            <div class="card">
              <div class="lbl">{f.lbl}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="safety" class="tide">
      <div class="wrap">
        <div class="kicker">Nothing is gone for good</div>
        <h2>Cleaning you can undo</h2>
        <p class="sub">A cleaner that guesses wrong shouldn't cost you a file. Every clean takes the same four steps, and only the last one deletes.</p>
        <div class="voyage">
          <div class="leg"><h3>Scan</h3><p>Only junk that rebuilds itself, and extra copies of duplicates, are checked for you. Backups and installers wait for you.</p></div>
          <div class="leg"><h3>Clean</h3><p>Everything goes to the Trash. A duplicate that changed since the scan is never touched.</p></div>
          <div class="leg"><h3>Put Back</h3><p>Changed your mind? <kbd>⌥⌘Z</kbd> puts the last clean back where it was.</p></div>
          <div class="leg warn"><h3>Empty Trash</h3><p>The only step that deletes anything, and it asks first. Bilge never does it on its own.</p></div>
        </div>
        <div class="omit">
          <div><b>Malware scanner</b><span>macOS's XProtect already does that.</span></div>
          <div><b>File shredder</b><span>Secure erase does nothing on an SSD.</span></div>
          <div><b>Stripping languages</b><span>It breaks apps' code signatures.</span></div>
          <div><b>App updater</b><span>Your apps already update themselves.</span></div>
        </div>
      </div>
    </section>

    <section id="tweaks">
      <div class="wrap split">
        <div>
          <div class="kicker">Settings › Tweaks</div>
          <h2>Small fixes for the rest of macOS</h2>
          <p class="sub">A drawer of tweaks for Finder, windows, the Dock, apps and the keyboard. Each is off until you turn it on, and turning it off puts back what it changed.</p>
          <ul class="ticks">
            <li><b>Finder:</b> cut and paste files, Return to open, Delete to trash, copy path, open Terminal here.</li>
            <li><b>Windows and Dock:</b> click the active app to hide it, minimize all, no Dock delay, Dock spacers.</li>
            <li><b>Apps:</b> auto-quit apps you've left idle, guard ⌘Q and ⌘W, launch any app with a shortcut.</li>
            <li><b>Keyboard and more:</b> a Hyper key, text and QR capture, a color picker, Cleaning and Cat Mode.</li>
          </ul>
        </div>
        <div class="panel">
          {TWEAKS.map((t) => (
            <label class="sw-row">
              <span>{t.name}<small>{t.note}</small></span>
              <input type="checkbox" class="switch" checked={t.on} aria-label={t.name} />
            </label>
          ))}
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="kicker">Versus the built-in tool</div>
        <h2>What Storage settings doesn't do</h2>
        <table class="cmp">
          <thead><tr><th></th><th class="us">Bilge</th><th>Storage settings</th></tr></thead>
          <tbody>
            <tr><td>Project build folders (node_modules, target, .venv)</td><td class="y">Yes</td><td class="n">No</td></tr>
            <tr><td>Byte-for-byte duplicates</td><td class="y">Yes</td><td class="n">No</td></tr>
            <tr><td>Look-alike photos outside Photos</td><td class="y">Yes</td><td class="n">No</td></tr>
            <tr><td>App leftovers removed with the app</td><td class="y">Yes</td><td class="n">No</td></tr>
            <tr><td>A map of every folder's size</td><td class="y">Space Lens</td><td class="n">No</td></tr>
            <tr><td>Undo the last clean</td><td class="y">⌥⌘Z</td><td class="n">No</td></tr>
            <tr><td>Free space in the menu bar</td><td class="y">Yes</td><td class="n">No</td></tr>
            <tr><td>Price</td><td class="y">{app.price} once</td><td class="n">Free, built in</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="pricing" class="tide">
      <div class="wrap">
        <div class="price">
          <div class="kicker">One price, once</div>
          <div class="amt">{app.price}<small> once</small></div>
          <ul class="ticks">
            <li>Every feature free for {app.trialDays} days, no account, no card</li>
            <li>After the trial, scanning, the menu bar, Speed, Care, Polish and Put Back stay free forever</li>
            <li>A license unlocks cleaning what Bilge finds, Uninstall and Tweaks</li>
            <li>Free updates; your key lives on your shafer.llc account and comes straight back to the app after checkout</li>
          </ul>
          <div class="cta">
            <a class="btn btn-sun" href="/download">Download free trial</a>
            <a class="btn btn-ghost" href="/buy">Buy · {app.price}</a>
          </div>
          <div class="req">{app.requires}</div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap faq">
        <div class="kicker">Questions</div>
        <h2>Before you pump</h2>
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
