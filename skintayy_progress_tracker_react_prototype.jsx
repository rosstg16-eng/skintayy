import React, { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import { Droplets, CheckCircle2, Plus, Minus, Calendar, Award, Scale, Ruler, Salad, Run, Bell, Pizza, Dumbbell } from "lucide-react";

/**
 * Skintayy — ultra-girly fitness & wellness tracker
 * Single-file React prototype using Tailwind + Recharts + localStorage (no backend required)
 *
 * Palette + vibe inspired by provided brand board (fika.).
 * If you have exact brand HEX + font file, I can swap them in later.
 */

// --- THEME (approx from reference board) ---
const theme = {
  // Brand HEX refined from your palette
  bg: "#FFD9E4",     // soft blush canvas
  pink: "#FF4DA0",   // hot pink (primary)
  lilac: "#CFA7FF",  // lilac secondary
  cocoa: "#3E2823",  // deep chocolate
  melon: "#FF7A59",  // coral/orange accent
  pistachio: "#D6E9B3", // soft green accent
  cream: "#FFF1F7",
};

// Load a chunky, friendly serif to mimic the look (Recoleta-like alternative)
const FontLink = () => (
  <>
    {/* Inter for UI; Recoleta-like brand font via @font-face. Replace URL below with your actual font file when you have it. */}
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <style>{`
      @font-face { font-family: 'SkintayyBrand'; src: url('/fonts/recoleta.woff2') format('woff2'); font-weight: 700; font-style: normal; font-display: swap; }
      .brand { font-family: 'SkintayyBrand', 'Gloock', serif; }
    `}</style>
  </>
);

// --- UTIL ---
const ls = {
  get: (k, fallback) => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback } catch { return fallback }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};

const todayKey = () => new Date().toISOString().slice(0,10);
const toWeek = (d) => {
  const dt = new Date(d);
  const onejan = new Date(dt.getFullYear(),0,1);
  return `${dt.getFullYear()}-W${Math.ceil((((dt - onejan) / 86400000) + onejan.getDay()+1)/7)}`;
};

// --- APP ---
export default function App(){
  return (
    <div style={{ background: theme.bg, minHeight: "100vh" }} className="text-[15px]">
      <FontLink />
      <header className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <div className="flex items-end gap-3">
          <div style={{ color: theme.cocoa }} className="brand text-5xl leading-none">skintayy<span style={{color:theme.pink}}>.</span></div>
          <span className="rounded-full px-3 py-1 text-xs" style={{background:theme.pistachio, color:theme.cocoa}}>strong • pretty • consistent</span>
        </div>
          <span className="rounded-full px-3 py-1 text-xs" style={{background:theme.pistachio, color:theme.cocoa}}>strong & pretty</span>
        </div>
        <p className="mt-2 opacity-80" style={{color:theme.cocoa}}>Weekly weight, biweekly measurements, water goals, meal check‑offs, runs & rewards.</p>
      </header>
      <Main />
      <footer className="max-w-6xl mx-auto px-4 py-10 opacity-70" style={{color:theme.cocoa}}>
        <p>© {new Date().getFullYear()} Skintayy. Prototype.</p>
      </footer>

{/* =========================
   PWA FILES (drop these into /public)
   1) /public/manifest.webmanifest
   2) /public/sw.js
   3) /public/icons/icon-192.png & icon-512.png (any square PNGs)
========================= */}
{/* manifest.webmanifest */}
{/*
{
  "name": "Skintayy",
  "short_name": "Skintayy",
  "theme_color": "#FF4DA0",
  "background_color": "#FFD9E4",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    {"src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png"}
  ]
}
*/}

{/* sw.js (very tiny cache‑first for app shell) */}
{/*
const CACHE = 'skintayy-v1';
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/','/index.html','/manifest.webmanifest'])));
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
*/}

