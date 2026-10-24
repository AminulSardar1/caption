import React, { useState } from 'react';
import { Copy, Check, Terminal, Cpu, Bot, Smartphone, Globe, MessageSquare } from 'lucide-react';

interface BotIntegrationProps {
  onToast: (msg: string) => void;
}

export const BotIntegration: React.FC<BotIntegrationProps> = ({ onToast }) => {
  const [activeBot, setActiveBot] = useState<'telegram' | 'discord' | 'messenger' | 'react'>('telegram');
  const [copied, setCopied] = useState<boolean>(false);

  const snippets = {
    telegram: `// Telegram Bot with telegraf or node-telegram-bot-api
import { Telegraf } from 'telegraf';
import axios from 'axios';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('love', async (ctx) => {
  try {
    const { data } = await axios.get('https://lovelycaption.com/api/random?name=love');
    await ctx.reply(\`❤️ "\${data.caption}"\\n— \${data.author || 'LovelyCaption'}\`);
  } catch (err) {
    await ctx.reply('Could not fetch caption at this moment.');
  }
});

bot.command('attitude', async (ctx) => {
  const { data } = await axios.get('https://lovelycaption.com/api/random?name=attitude');
  await ctx.reply(\`🔥 "\${data.caption}"\`);
});

bot.launch();
console.log('🤖 Telegram Caption Bot is live!');`,

    discord: `// Discord Bot (discord.js v14)
import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import axios from 'axios';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!caption')) {
    const args = message.content.split(' ');
    const category = args[1] || 'love';

    const { data } = await axios.get(\`https://lovelycaption.com/api/random?name=\${category}\`);

    const embed = new EmbedBuilder()
      .setColor(0xE11D48)
      .setTitle(\`✨ \${category.toUpperCase()} Caption\`)
      .setDescription(\`"\${data.caption}"\`)
      .setFooter({ text: 'Powered by Love Caption API • lovelycaption.com' });

    message.reply({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);`,

    messenger: `// Facebook Messenger Webhook Handler
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

      if (webhookEvent.message && webhookEvent.message.text) {
        const text = webhookEvent.message.text.toLowerCase();
        let cat = 'love';
        if (text.includes('sad')) cat = 'sad';
        if (text.includes('attitude')) cat = 'attitude';

        const { data } = await axios.get(\`https://lovelycaption.com/api/random?name=\${cat}\`);
        await sendMessengerReply(senderPsid, \`❤️ \${data.caption}\`);
      }
    }
    res.status(200).send('EVENT_RECEIVED');
  }
});`,

    react: `// React custom hook: useLoveCaption.ts
import { useState, useEffect } from 'react';

export function useLoveCaption(category = 'love') {
  const [caption, setCaption] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNew = async () => {
    setLoading(true);
    try {
      const res = await fetch(\`/api/random?name=\${category}\`);
      const data = await res.json();
      setCaption(data.caption);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNew();
  }, [category]);

  return { caption, loading, refresh: fetchNew };
}`
  };

  const copyCode = () => {
    navigator.clipboard.writeText(snippets[activeBot]);
    setCopied(true);
    onToast('Bot snippet copied to clipboard! 🤖');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="bots" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">
            <span>Automation & Bots</span>
            <span>·</span>
            <span>Developer SDK Guides</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Seamless Bot & Website Integration
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Plug Love Caption API directly into Telegram bots, Messenger chatbots, Discord communities, and web applications in under 60 seconds.
          </p>
        </div>

        {/* 4 Feature cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
              <Bot className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Telegram & Messenger</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Instant quotes for auto-responders and scheduled drops.</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Discord Communities</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Rich embed replies with custom categories.</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <Globe className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Websites & Blogs</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Dynamic "Quote of the day" and social caption generators.</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
              <Smartphone className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Mobile Apps</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Fast JSON payloads with near-instant offline caching.</p>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
          <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {(['telegram', 'discord', 'messenger', 'react'] as const).map((bot) => (
                <button
                  key={bot}
                  onClick={() => setActiveBot(bot)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeBot === bot
                      ? 'bg-rose-600 text-white font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {bot === 'telegram'
                    ? 'Telegram Bot'
                    : bot === 'discord'
                    ? 'Discord Bot'
                    : bot === 'messenger'
                    ? 'FB Messenger'
                    : 'React Hook'}
                </button>
              ))}
            </div>

            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="p-5 overflow-x-auto max-h-[400px]">
            <pre className="font-mono text-xs text-slate-200 leading-relaxed">
              {snippets[activeBot]}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
