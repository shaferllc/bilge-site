// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import type { AppInfo } from "../config.js";
import { Footer, Layout, Nav } from "./layout.js";

export const PrivacyPage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout title="Privacy — Bilge" description="What Bilge sends, and what it doesn't.">
    <Nav />
    <main class="wrap prose">
      <h1>Privacy</h1>
      <p>Bilge has no telemetry or analytics. What it finds on your Mac stays on your Mac.</p>
      <h2>On your Mac</h2>
      <p>Scan results are kept in ~/Library/Application Support/Bilge so they survive a relaunch. Photo comparisons run on your Mac with Apple's Vision framework. None of it is uploaded.</p>
      <h2>When Bilge goes online</h2>
      <p><b>License activation and a regular check:</b> your license key, your Mac's name and a one-way hash of its hardware ID (not the ID itself) go to shafer.llc to confirm the license and list the Mac on your account.</p>
      <p><b>Update checks:</b> Bilge fetches dl.shafer.llc/bilge/appcast.xml a little after launch to see whether a newer version exists. Nothing about your Mac is sent beyond what any web request carries.</p>
      <h2>Buying</h2>
      <p>You buy through a shafer.llc account: you sign in with a link sent to your email, no password. Payment is handled by Stripe, which receives your card details under its own privacy policy; we never see them. We keep your email, your order and your license key so we can support your license.</p>
      <h2>This website</h2>
      <p>No cookies or trackers. Our host keeps standard request logs.</p>
      <h2>Contact</h2>
      <p>Questions: <a href="https://shafer.llc/support?product=bilge">shafer.llc/support</a>, or reply to your receipt.</p>
    </main>
    <Footer version={app.version} />
  </Layout>
);

export const TermsPage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout title="Terms — Bilge" description="The license that comes with Bilge.">
    <Nav />
    <main class="wrap prose">
      <h1>Terms</h1>
      <p>A Bilge license is for one person. You may use it on the Macs you own or use.</p>
      <p>The trial is free for {app.trialDays} days with every feature. Afterwards scanning, the menu bar, Speed, Care, Polish and Put Back remain free; cleaning, Uninstall and Tweaks need a license.</p>
      <p>Bilge is provided as-is, without warranty. It moves files to the Trash rather than deleting them, and Empty Trash asks first, but you choose what is cleaned; check before you empty the Trash.</p>
      <p>Updates for the current major version are free.</p>
    </main>
    <Footer version={app.version} />
  </Layout>
);
