
# 💕 Anniversary Countdown Website

A single-page, fun and romantic anniversary countdown website with a pink & purple theme, floating emoji/sticker background, and shared song suggestions.

---

## 1. Hero Section — Live Countdown Timer
- A big, beautiful live countdown showing **days, hours, minutes, and seconds** remaining until **February 28th**
- On February 28th itself, the countdown transforms into a **"Happy Anniversary! 🎉💕"** celebration message with confetti-style effects
- Fancy decorative buttons around the counter (e.g., pulsing hearts, sparkle effects)

## 2. Daily Love Quote
- A centered, elegantly styled love quote that **changes every day automatically**
- A curated collection of romantic quotes — one for each day
- On **February 28th**, the quote is replaced with a special **Happy Anniversary message**

## 3. Song Suggestion Section — "Music to Play in Car 🎵"
- A text input where **anyone** visiting the site can type and submit a song suggestion
- All submitted songs appear in a list below, visible to **everyone** in real-time
- Stored in a **Supabase database** so suggestions persist and are shared across all visitors
- Simple, clean card-style list of all suggested songs

## 4. Background — Floating Emoji Stickers
- The entire page background is filled with **cute outline-style emoji stickers** (hearts, stars, flowers, music notes, kisses, etc.)
- Emojis are **outline/border only** — no filled colors, keeping it clean and playful
- Subtle floating or drifting animation so the background feels alive but not distracting

## 5. Visual Design & Theme
- **Pink and purple gradient** color palette throughout
- Soft, romantic typography with fun accents
- Smooth animations and hover effects on interactive elements
- Fully responsive — looks great on both mobile and desktop
- Clean, minimal layout — fun but not cluttered

## Backend (Supabase)
- One simple table for song suggestions (song name + timestamp)
- Open insert & read access so any visitor can add and see songs — no login required
