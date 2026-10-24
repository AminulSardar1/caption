# 🚀 LOVE CAPTION API — v1.0.0 ❤️✨

> Discover the perfect caption for every moment! Built with **Node.js**, **Express.js**, **Axios**, **Cheerio**, and **React 19**. Developed by **Aminulsordar** ([lovelycaption.com](https://lovelycaption.com)).

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Version](https://img.shields.io/badge/API_Version-1.0.0-rose?style=for-the-badge)](https://lovelycaption.com)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)](LICENSE)

---

## 📖 Table of Contents

1. [🌟 Features](#-features)
2. [📌 API Endpoints & Reference](#-api-endpoints--reference)
3. [⚡ Quick Start & Live Testing](#-quick-start--live-testing)
4. [🚀 Deploy to Vercel (A to Z Guide)](#-deploy-to-vercel-a-to-z-guide)
   - [Method 1: Deploy using Vercel CLI](#method-1-deploy-using-vercel-cli-recommended)
   - [Method 2: Deploy with GitHub & Vercel Dashboard](#method-2-deploy-with-github--vercel-dashboard)
   - [Understanding vercel.json & Serverless Architecture](#understanding-verceljson--serverless-architecture)
5. [💻 Local Development Setup](#-local-development-setup)
6. [🤖 Bot & Application Integration Guides](#-bot--application-integration-guides)
   - [Telegram Bot](#1-telegram-bot-telegraf)
   - [Discord Bot](#2-discord-bot-discordjs-v14)
   - [Facebook Messenger Bot](#3-facebook-messenger-webhook)
   - [React Custom Hook](#4-react-custom-hook-uselovecaption)
7. [📁 Project File Structure](#-project-file-structure)
8. [🛠️ Tech Stack](#️-tech-stack)
9. [👨‍💻 Author & Credits](#-author--credits)

---

## 🌟 Features

- ✅ **Live Caption Scraping**: Real-time extraction with Axios & Cheerio targeting lovelycaption.com.
- ✅ **Automatic JSON Caching**: In-memory and structured caching ensures ultra-fast response times (~25ms).
- ✅ **Category-Based Captions**: 12 curated packs including *Love, Romantic, Attitude, Sad, Friendship, Breakup, Deep, Motivation, Aesthetic, Cute, Travel, and Birthday*.
- ✅ **Random Caption Generator**: Instant random quotes scoped to any category or selected globally.
- ✅ **No-Limit / Unlimited Mode**: Fetch all available captions without artificial limits using `limit=all` or omitting `limit`.
- ✅ **Custom Caption Limits**: Support for `limit=1` (single caption convenience) or any custom number.
- ✅ **Interactive Web Studio**: Integrated Instagram / WhatsApp story card generator with Canvas image export.
- ✅ **Vercel Serverless Ready**: Native `/api/index.ts` handler and pre-configured `vercel.json` rewrites.

---

## 📌 API Endpoints & Reference

Base URL (Local): `http://localhost:3000`  
Base URL (Vercel): `https://your-app.vercel.app`

### 1. Get All Categories
Retrieve list of all categories with total caption count and metadata.

- **Method**: `GET`
- **Endpoint**: `/api/category`
- **cURL**:
  ```bash
  curl -X GET "https://your-app.vercel.app/api/category"
  ```
- **Example Response**:
  ```json
  {
    "status": true,
    "developer": "Aminulsordar",
    "api_version": "1.0.0",
    "total_categories": 12,
    "categories": [
      {
        "name": "love",
        "title": "Love Captions",
        "count": 30,
        "icon": "Heart",
        "description": "Heartfelt and romantic expressions of genuine affection",
        "tagline": "For that special someone who holds your heart",
        "sample": "In your arms, I have found my forever sanctuary."
      },
      {
        "name": "romantic",
        "title": "Romantic Captions",
        "count": 22,
        "icon": "Sparkles",
        "description": "Passionate, poetic and tender moments together"
      }
    ]
  }
  ```

---

### 2. Category Captions (Unlimited / No Limit)
Fetch all captions for a specific category without artificial caps.

- **Method**: `GET`
- **Endpoint**: `/api/category?name=love` (or `/api/category?name=love&limit=all`)
- **cURL**:
  ```bash
  curl -X GET "https://your-app.vercel.app/api/category?name=love"
  ```
- **Example Response**:
  ```json
  {
    "status": true,
    "category": "love",
    "count": 30,
    "total_available": 30,
    "is_unlimited": true,
    "limit_applied": "unlimited",
    "source": "cached_json",
    "developer": "Aminulsordar",
    "api_version": "1.0.0",
    "data": [
      {
        "id": "love-1",
        "caption": "In your arms, I have found my forever sanctuary.",
        "category": "love",
        "author": "Nicholas Sparks",
        "tags": ["love", "forever", "sanctuary"],
        "likes": 1840
      }
    ]
  }
  ```

---

### 3. Single Caption
Fetch a single formatted caption.

- **Method**: `GET`
- **Endpoint**: `/api/category?name=love&limit=1`
- **cURL**:
  ```bash
  curl -X GET "https://your-app.vercel.app/api/category?name=love&limit=1"
  ```
- **Example Response**:
  ```json
  {
    "status": true,
    "category": "love",
    "count": 1,
    "is_unlimited": false,
    "caption": "In your arms, I have found my forever sanctuary.",
    "author": "Nicholas Sparks",
    "tags": ["love", "forever", "sanctuary"],
    "likes": 1840,
    "source": "cached_json",
    "developer": "Aminulsordar",
    "api_version": "1.0.0"
  }
  ```

---

### 4. Random Caption Generator
Get a random caption from any category or across the entire collection.

- **Method**: `GET`
- **Endpoint**: `/api/random?name=love` (or `/api/random` for any category)
- **cURL**:
  ```bash
  curl -X GET "https://your-app.vercel.app/api/random?name=love"
  ```
- **Example Response**:
  ```json
  {
    "status": true,
    "category": "love",
    "caption": "You make the ordinary moments feel like poetry.",
    "author": "LovelyCaption",
    "tags": ["poetry", "tender", "magic"],
    "likes": 2830,
    "developer": "Aminulsordar",
    "api_version": "1.0.0",
    "timestamp": "2026-10-24T13:45:00.000Z"
  }
  ```

---

### 5. Live Scrape & Cache Refresh
Scrapes `lovelycaption.com` in real time with Cheerio and updates the JSON cache.

- **Method**: `GET`
- **Endpoint**: `/api/category?name=love&live=true`
- **cURL**:
  ```bash
  curl -X GET "https://your-app.vercel.app/api/category?name=love&live=true"
  ```

---

### 6. Health & Diagnostics
- **Method**: `GET`
- **Endpoint**: `/api/stats` or `/api/health`

---

## 🚀 Deploy to Vercel (A to Z Guide)

This project is pre-configured for Vercel with zero additional build steps needed!

### Method 1: Deploy using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if you don't have it installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   vercel
   ```
   - *Set up and deploy?* Press **Y**
   - *Which scope?* Select your personal account or team
   - *Link to existing project?* Press **N**
   - *What's your project name?* Press **Enter** (default: `love-caption-api`)
   - *In which directory is code located?* Press **Enter** (`./`)
   - Vercel automatically detects the settings from `vercel.json`!

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

Your API and web studio are now live at `https://your-project.vercel.app`! 🎉

---

### Method 2: Deploy with GitHub & Vercel Dashboard

1. **Push your code to a Git repository** (GitHub / GitLab / Bitbucket):
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Love Caption API"
   git remote add origin https://github.com/your-username/love-caption-api.git
   git push -u origin main
   ```

2. **Go to Vercel Dashboard**:
   - Visit [vercel.com/new](https://vercel.com/new).
   - Select your Git provider and click **Import** next to your `love-caption-api` repo.

3. **Configure Project**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Click **Deploy**!
   Vercel will build the frontend into `dist/` and automatically route `/api/*` to the Serverless Function at `/api/index.ts`.

---

### Understanding vercel.json & Serverless Architecture

The included `vercel.json` file configures serverless routing:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT" }
      ]
    }
  ]
}
```

- Any request to `/api/*` is routed to the serverless function `/api/index.ts`.
- All other web traffic serves the React SPA from `/dist/index.html`.
- CORS headers are pre-configured so any client or bot can query the API without CORS blockers.

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/love-caption-api.git
   cd love-caption-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server** (runs full-stack Express + Vite on port 3000):
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Start production server**:
   ```bash
   npm start
   ```

---

## 🤖 Bot & Application Integration Guides

### 1. Telegram Bot (Telegraf)

```typescript
import { Telegraf } from 'telegraf';
import axios from 'axios';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

bot.command('caption', async (ctx) => {
  const category = ctx.message.text.split(' ')[1] || 'love';
  try {
    const { data } = await axios.get(`https://your-app.vercel.app/api/random?name=${category}`);
    await ctx.reply(`✨ "${data.caption}"\n— ${data.author || 'LovelyCaption'}`);
  } catch (error) {
    await ctx.reply('Sorry, unable to fetch a caption right now.');
  }
});

bot.launch();
console.log('Telegram Caption Bot is running!');
```

---

### 2. Discord Bot (discord.js v14)

```typescript
import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import axios from 'axios';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!caption')) {
    const category = message.content.split(' ')[1] || 'love';
    const { data } = await axios.get(`https://your-app.vercel.app/api/random?name=${category}`);

    const embed = new EmbedBuilder()
      .setColor(0xE11D48)
      .setTitle(`❤️ ${category.toUpperCase()} Caption`)
      .setDescription(`"${data.caption}"`)
      .setFooter({ text: 'Powered by Love Caption API • lovelycaption.com' });

    message.reply({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
```

---

### 3. Facebook Messenger Webhook

```javascript
import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    for (const entry of body.entry) {
      const webhookEvent = entry.messaging[0];
      const senderPsid = webhookEvent.sender.id;

      if (webhookEvent.message?.text) {
        const text = webhookEvent.message.text.toLowerCase();
        const category = text.includes('sad') ? 'sad' : text.includes('attitude') ? 'attitude' : 'love';

        const { data } = await axios.get(`https://your-app.vercel.app/api/random?name=${category}`);
        await sendMessengerMessage(senderPsid, `❤️ ${data.caption}`);
      }
    }
    res.status(200).send('EVENT_RECEIVED');
  }
});
```

---

### 4. React Custom Hook (`useLoveCaption`)

```typescript
import { useState, useEffect } from 'react';

export function useLoveCaption(category = 'love') {
  const [caption, setCaption] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://your-app.vercel.app/api/random?name=${category}`);
      const data = await res.json();
      setCaption(data.caption);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [category]);

  return { caption, loading, refresh };
}
```

---

## 📁 Project File Structure

```
love-caption-api/
├── api/
│   └── index.ts                 # Vercel Serverless Function entry point
├── public/
├── src/
│   ├── assets/images/           # Generated high-resolution visual assets
│   ├── components/
│   │   ├── ApiPlayground.tsx    # Interactive query builder & code generator
│   │   ├── BotIntegration.tsx   # Telegram, Discord, Messenger SDK guides
│   │   ├── CaptionStudio.tsx    # Visual quote card maker with Canvas export
│   │   ├── CategoryExplorer.tsx # Searchable caption archive with 12 packs
│   │   ├── Footer.tsx           # Author attribution & endpoint directory
│   │   ├── Hero.tsx             # Terminal live tester & hero display
│   │   ├── Navbar.tsx           # Top navigation adhering to 3-zone contract
│   │   └── ScraperStatus.tsx    # Live scraper pipeline & cache diagnostics
│   ├── data/
│   │   └── captionsData.ts      # Multi-category captions database & schema
│   ├── server/
│   │   ├── captionService.ts    # Cheerio/Axios scraper & caching engine
│   │   └── createApp.ts         # Shared Express app creator (local + Vercel)
│   ├── App.tsx                  # Root React application
│   ├── index.css                # Tailwind CSS v4 styling & font variables
│   └── main.tsx                 # Client entry point
├── index.html                   # HTML entry point with metadata & fonts
├── metadata.json                # Project capabilities & permissions
├── package.json                 # Dependencies & build scripts
├── server.ts                    # Local development server with Vite middleware
├── tsconfig.json                # TypeScript configuration
├── vercel.json                  # Vercel deployment & routing configuration
└── README.md                    # Complete A-to-Z documentation
```

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Scraping Engine**: Axios, Cheerio
- **Data Caching**: In-Memory + Automatic JSON Cache
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Vite 8, tsx
- **Deployment**: Vercel Serverless, Cloud Run, Docker

---

## 👨‍💻 Author & Credits

- **Developer**: Aminulsordar
- **Official Website**: [lovelycaption.com](https://lovelycaption.com)
- **API Version**: `v1.0.0`
- **License**: Apache 2.0

*Simple API. Endless Caption Possibilities! ❤️*
