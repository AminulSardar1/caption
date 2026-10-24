export interface CaptionItem {
  id: string;
  caption: string;
  category: string;
  author?: string;
  tags: string[];
  likes: number;
}

export interface CategoryInfo {
  name: string;
  title: string;
  count: number;
  icon: string;
  description: string;
  tagline: string;
}

export const CATEGORIES_CONFIG: CategoryInfo[] = [
  {
    name: "love",
    title: "Love Captions",
    count: 24,
    icon: "Heart",
    description: "Heartfelt and romantic expressions of genuine affection",
    tagline: "For that special someone who holds your heart"
  },
  {
    name: "romantic",
    title: "Romantic Captions",
    count: 22,
    icon: "Sparkles",
    description: "Passionate, poetic and tender moments together",
    tagline: "Whispers of soulmates and timeless romance"
  },
  {
    name: "attitude",
    title: "Attitude & Swagger",
    count: 24,
    icon: "Flame",
    description: "Bold, classy, witty, and unapologetic self-worth",
    tagline: "Unmatched confidence and fierce vibes"
  },
  {
    name: "sad",
    title: "Sad & Melancholy",
    count: 22,
    icon: "CloudRain",
    description: "Raw reflections for sorrow, quiet tears, and heavy hearts",
    tagline: "When words echo the quiet aches inside"
  },
  {
    name: "friendship",
    title: "Friendship & Besties",
    count: 20,
    icon: "Users",
    description: "Unconditional loyalty, crazy adventures, and lifelong bonds",
    tagline: "For friends that feel like chosen family"
  },
  {
    name: "breakup",
    title: "Breakup & Healing",
    count: 20,
    icon: "HeartCrack",
    description: "Moving on, quiet strength, and reclaiming yourself",
    tagline: "Turning endings into gentle self-restoration"
  },
  {
    name: "deep",
    title: "Deep & Soulful",
    count: 22,
    icon: "Compass",
    description: "Philosophical reflections on destiny, existence, and time",
    tagline: "Thoughts that linger long after reading"
  },
  {
    name: "aesthetic",
    title: "Aesthetic & Mood",
    count: 22,
    icon: "Palette",
    description: "Dreamy golden hour tones, delicate words, and calm vibes",
    tagline: "Minimalist poetry for your visual gallery"
  },
  {
    name: "motivation",
    title: "Motivation & Drive",
    count: 20,
    icon: "Zap",
    description: "Relentless discipline, perseverance, and winning mindset",
    tagline: "Fuel your fire and silence the doubt"
  },
  {
    name: "cute",
    title: "Cute & Sweet",
    count: 20,
    icon: "Smile",
    description: "Whimsical warmth, butterfly moments, and smiling eyes",
    tagline: "Sweet little sprinkles of joy"
  },
  {
    name: "travel",
    title: "Wanderlust & Travel",
    count: 20,
    icon: "MapPin",
    description: "Sunsets over horizons, winding roads, and boundless skies",
    tagline: "Collecting memories across coordinates"
  },
  {
    name: "birthday",
    title: "Birthday & Celebration",
    count: 18,
    icon: "Gift",
    description: "Milestone cheers, gratitude for another chapter, and wishes",
    tagline: "Celebrating the blessing of your existence"
  }
];

export const INITIAL_CAPTIONS: Record<string, CaptionItem[]> = {
  love: [
    {
      id: "love-1",
      caption: "In your arms, I have found my forever sanctuary.",
      category: "love",
      author: "Nicholas Sparks",
      tags: ["love", "forever", "sanctuary"],
      likes: 1840
    },
    {
      id: "love-2",
      caption: "You are my favorite notification in a world full of noise.",
      category: "love",
      tags: ["modern", "cute", "romance"],
      likes: 2190
    },
    {
      id: "love-3",
      caption: "I loved you yesterday, love you still, always have, always will.",
      category: "love",
      author: "Elaine Davis",
      tags: ["timeless", "devotion", "forever"],
      likes: 3410
    },
    {
      id: "love-4",
      caption: "Home is not a place anymore; it is the rhythm of your heartbeat.",
      category: "love",
      tags: ["home", "soulmate", "warmth"],
      likes: 1950
    },
    {
      id: "love-5",
      caption: "You make the ordinary moments feel like poetry.",
      category: "love",
      tags: ["poetry", "tender", "magic"],
      likes: 2830
    },
    {
      id: "love-6",
      caption: "Every love story is beautiful, but ours is my favorite masterpiece.",
      category: "love",
      tags: ["story", "couple", "cherish"],
      likes: 3120
    },
    {
      id: "love-7",
      caption: "Falling in love with you was the easiest decision I never had to make.",
      category: "love",
      tags: ["destiny", "effortless", "heart"],
      likes: 2450
    },
    {
      id: "love-8",
      caption: "You are the missing piece my heart had been searching for all along.",
      category: "love",
      tags: ["soulmate", "puzzle", "complete"],
      likes: 2670
    },
    {
      id: "love-9",
      caption: "Together is my favorite place on this entire earth.",
      category: "love",
      tags: ["together", "adventure", "couple"],
      likes: 2980
    },
    {
      id: "love-10",
      caption: "Loving you feels like breathing—effortless, essential, and life-giving.",
      category: "love",
      tags: ["breathing", "essential", "life"],
      likes: 1890
    },
    {
      id: "love-11",
      caption: "I look at you and I see the rest of my life in front of my eyes.",
      category: "love",
      tags: ["future", "eyes", "forever"],
      likes: 3340
    },
    {
      id: "love-12",
      caption: "My heart knew you were the one long before my mind caught up.",
      category: "love",
      tags: ["intuition", "destiny", "spark"],
      likes: 2210
    },
    {
      id: "love-13",
      caption: "You are the silence in the thunder and the light in the deepest night.",
      category: "love",
      tags: ["peace", "comfort", "shelter"],
      likes: 1780
    },
    {
      id: "love-14",
      caption: "There is no remedy for love but to love more.",
      category: "love",
      author: "Henry David Thoreau",
      tags: ["classic", "literature", "truth"],
      likes: 2540
    },
    {
      id: "love-15",
      caption: "Just when I think it is impossible to love you more, you smile at me.",
      category: "love",
      tags: ["smile", "adoration", "sweet"],
      likes: 2890
    },
    {
      id: "love-16",
      caption: "If I know what love is, it is because of you.",
      category: "love",
      author: "Hermann Hesse",
      tags: ["classic", "meaning", "deep"],
      likes: 3100
    },
    {
      id: "love-17",
      caption: "Your voice is my favorite soundtrack in this chaotic universe.",
      category: "love",
      tags: ["voice", "soundtrack", "melody"],
      likes: 2150
    },
    {
      id: "love-18",
      caption: "With you, forever does not feel nearly long enough.",
      category: "love",
      tags: ["eternity", "endless", "time"],
      likes: 2760
    },
    {
      id: "love-19",
      caption: "You are the prayer I forgot I whispered as a child.",
      category: "love",
      tags: ["answered", "destiny", "prayer"],
      likes: 2320
    },
    {
      id: "love-20",
      caption: "I choose you. And I'll choose you over and over, without pause, in a heartbeat.",
      category: "love",
      tags: ["choice", "devotion", "commitment"],
      likes: 3890
    },
    {
      id: "love-21",
      caption: "You are the compass that always guides my soul back home.",
      category: "love",
      tags: ["compass", "guide", "soul"],
      likes: 2940
    },
    {
      id: "love-22",
      caption: "In a world where everything is temporary, my love for you is eternal.",
      category: "love",
      tags: ["eternal", "infinite", "devotion"],
      likes: 3420
    },
    {
      id: "love-23",
      caption: "Your laughter is my favorite sound, and your happiness is my life's mission.",
      category: "love",
      tags: ["laughter", "mission", "joy"],
      likes: 2780
    },
    {
      id: "love-24",
      caption: "I didn’t just fall in love with you; I walked into love, knowing every step was right.",
      category: "love",
      tags: ["intentional", "destiny", "certainty"],
      likes: 3610
    },
    {
      id: "love-25",
      caption: "Every morning waking up beside you feels like an unearned miracle.",
      category: "love",
      tags: ["miracle", "morning", "blessing"],
      likes: 3150
    },
    {
      id: "love-26",
      caption: "To love and be loved is to feel the warmth of the sun from both sides.",
      category: "love",
      author: "David Viscott",
      tags: ["warmth", "sunshine", "balance"],
      likes: 2890
    },
    {
      id: "love-27",
      caption: "You’re the first and last thing on my mind every single day.",
      category: "love",
      tags: ["thoughts", "presence", "mind"],
      likes: 2430
    },
    {
      id: "love-28",
      caption: "My heart beats your name in secret cadences only the night can hear.",
      category: "love",
      tags: ["secret", "heartbeat", "rhythm"],
      likes: 1980
    },
    {
      id: "love-29",
      caption: "You are my peace in the midst of every storm that comes my way.",
      category: "love",
      tags: ["peace", "shelter", "calm"],
      likes: 3320
    },
    {
      id: "love-30",
      caption: "Loving you has been the grandest adventure of my existence.",
      category: "love",
      tags: ["adventure", "journey", "life"],
      likes: 3750
    }
  ],

  romantic: [
    {
      id: "rom-1",
      caption: "Moonlight drowns out all but the brightest stars, and you outshine them all.",
      category: "romantic",
      tags: ["moonlight", "stars", "elegance"],
      likes: 2140
    },
    {
      id: "rom-2",
      caption: "Let’s get lost in a city that doesn't know our names, just you and me.",
      category: "romantic",
      tags: ["escapade", "wander", "intimacy"],
      likes: 1980
    },
    {
      id: "rom-3",
      caption: "Whatever our souls are made of, his and mine are the exact same.",
      category: "romantic",
      author: "Emily Brontë",
      tags: ["classic", "wuthering", "soul"],
      likes: 3450
    },
    {
      id: "rom-4",
      caption: "Your touch writes symphonies across my skin that only my soul can hear.",
      category: "romantic",
      tags: ["symphony", "passion", "touch"],
      likes: 2310
    },
    {
      id: "rom-5",
      caption: "A midnight rendezvous, candle smoke, and your gaze across the room.",
      category: "romantic",
      tags: ["midnight", "gaze", "candle"],
      likes: 1720
    },
    {
      id: "rom-6",
      caption: "I want to be your morning coffee thought and your midnight wish upon a star.",
      category: "romantic",
      tags: ["coffee", "wish", "tender"],
      likes: 2890
    },
    {
      id: "rom-7",
      caption: "Drunk on the vintage wine of your lingering whispers.",
      category: "romantic",
      tags: ["poetic", "wine", "whisper"],
      likes: 1640
    },
    {
      id: "rom-8",
      caption: "Hold my hand, and the heavy world suddenly weighs nothing at all.",
      category: "romantic",
      tags: ["hand", "touch", "lightness"],
      likes: 2790
    },
    {
      id: "rom-9",
      caption: "Two souls tangled in the gentle stillness between two heartbeats.",
      category: "romantic",
      tags: ["stillness", "rhythm", "intimate"],
      likes: 2010
    },
    {
      id: "rom-10",
      caption: "You are the poetry I never knew how to write, but always loved to read.",
      category: "romantic",
      tags: ["verse", "prose", "poet"],
      likes: 3200
    },
    {
      id: "rom-11",
      caption: "Dancing in the quiet kitchen as rain washes down the glass windowpane.",
      category: "romantic",
      tags: ["rain", "dance", "kitchen"],
      likes: 2480
    },
    {
      id: "rom-12",
      caption: "Every time you kiss me, time politely steps out of the room.",
      category: "romantic",
      tags: ["kiss", "timeless", "sweet"],
      likes: 2950
    }
  ],

  attitude: [
    {
      id: "att-1",
      caption: "I am not a second choice, baby. You either choose me or you lose me.",
      category: "attitude",
      tags: ["boss", "confidence", "unapologetic"],
      likes: 4120
    },
    {
      id: "att-2",
      caption: "They told me I couldn’t, so I did it twice and took pictures.",
      category: "attitude",
      tags: ["savage", "hustle", "victory"],
      likes: 3850
    },
    {
      id: "att-3",
      caption: "Classy with a savage side. Sweet until you test my boundaries.",
      category: "attitude",
      tags: ["classy", "boundaries", "queen"],
      likes: 3290
    },
    {
      id: "att-4",
      caption: "My personality is who I am. My attitude depends on who you are.",
      category: "attitude",
      tags: ["mirror", "real", "respect"],
      likes: 4610
    },
    {
      id: "att-5",
      caption: "I don’t chase; I attract. What’s meant for me will find me standing tall.",
      category: "attitude",
      tags: ["attract", "magnetism", "power"],
      likes: 3940
    },
    {
      id: "att-6",
      caption: "Silence is the best response when dealing with an amateur.",
      category: "attitude",
      tags: ["silence", "calm", "superior"],
      likes: 3180
    },
    {
      id: "att-7",
      caption: "Not everyone has to like me. Not everyone has good taste.",
      category: "attitude",
      tags: ["witty", "taste", "bold"],
      likes: 4790
    },
    {
      id: "att-8",
      caption: "Built from resilience, dressed in confidence, driven by ambition.",
      category: "attitude",
      tags: ["resilient", "drive", "alpha"],
      likes: 2840
    },
    {
      id: "att-9",
      caption: "I am an acquired taste. If you don’t like me, acquire some taste.",
      category: "attitude",
      tags: ["humor", "sharp", "swagger"],
      likes: 3560
    },
    {
      id: "att-10",
      caption: "Be a diamond—rare, precious, and unbreakable under immense pressure.",
      category: "attitude",
      tags: ["diamond", "pressure", "strength"],
      likes: 3380
    },
    {
      id: "att-11",
      caption: "Down to earth, but still floating above the shallow drama.",
      category: "attitude",
      tags: ["nodrama", "peace", "elevation"],
      likes: 2750
    },
    {
      id: "att-12",
      caption: "Kings and queens don’t compete with pawns.",
      category: "attitude",
      tags: ["chess", "royalty", "focus"],
      likes: 4020
    }
  ],

  sad: [
    {
      id: "sad-1",
      caption: "The heaviest thing I carry is the echo of words you never said.",
      category: "sad",
      tags: ["echo", "unsaid", "heavy"],
      likes: 2310
    },
    {
      id: "sad-2",
      caption: "It hurts when someone who gave you the best memories becomes a memory.",
      category: "sad",
      tags: ["memories", "lost", "heartbreak"],
      likes: 3890
    },
    {
      id: "sad-3",
      caption: "Smiling outside while folding into origami pieces on the inside.",
      category: "sad",
      tags: ["mask", "hidden", "fragile"],
      likes: 2150
    },
    {
      id: "sad-4",
      caption: "Sometimes you have to let people go, not because you don't care, but because they don't.",
      category: "sad",
      tags: ["letgo", "acceptance", "truth"],
      likes: 3420
    },
    {
      id: "sad-5",
      caption: "The loneliest moment is when you are surrounded by crowds and nobody understands.",
      category: "sad",
      tags: ["lonely", "crowd", "isolation"],
      likes: 2780
    },
    {
      id: "sad-6",
      caption: "I still search for traces of you in the songs we used to play on repeat.",
      category: "sad",
      tags: ["playlist", "nostalgia", "ghosts"],
      likes: 3100
    },
    {
      id: "sad-7",
      caption: "Heavy hearts, rainy city lights, and an empty seat beside me.",
      category: "sad",
      tags: ["city", "rain", "empty"],
      likes: 1940
    },
    {
      id: "sad-8",
      caption: "You promised forever, but your forever had an early expiration date.",
      category: "sad",
      tags: ["brokenpromise", "hurt", "grief"],
      likes: 2680
    },
    {
      id: "sad-9",
      caption: "Some days the sadness feels like an ocean, and I forgot how to swim.",
      category: "sad",
      tags: ["ocean", "drowning", "tide"],
      likes: 2490
    },
    {
      id: "sad-10",
      caption: "I miss the person you were before the world made you so cold.",
      category: "sad",
      tags: ["change", "cold", "missyou"],
      likes: 3260
    }
  ],

  friendship: [
    {
      id: "fr-1",
      caption: "Friends pick us up when we fall down, and if they can't, they lie down and listen.",
      category: "friendship",
      tags: ["support", "loyal", "bond"],
      likes: 2840
    },
    {
      id: "fr-2",
      caption: "Finding friends with the exact same mental wavelength is true wealth.",
      category: "friendship",
      tags: ["wavelength", "laughter", "squad"],
      likes: 3410
    },
    {
      id: "fr-3",
      caption: "Years may pass and miles may separate, but our bond remains untouched.",
      category: "friendship",
      tags: ["distance", "loyalty", "forever"],
      likes: 2650
    },
    {
      id: "fr-4",
      caption: "No matter how serious life gets, you still have that one person you can be completely ridiculous with.",
      category: "friendship",
      tags: ["silly", "bestie", "joy"],
      likes: 3190
    },
    {
      id: "fr-5",
      caption: "Good times + Crazy friends = Unforgettable memories.",
      category: "friendship",
      tags: ["memories", "crazy", "trip"],
      likes: 2980
    }
  ],

  breakup: [
    {
      id: "brk-1",
      caption: "Sometimes good things fall apart so better things can fall into place.",
      category: "breakup",
      author: "Marilyn Monroe",
      tags: ["rebuild", "healing", "growth"],
      likes: 3740
    },
    {
      id: "brk-2",
      caption: "I lost someone who didn't love me, but you lost someone who loved you completely.",
      category: "breakup",
      tags: ["truth", "loss", "realization"],
      likes: 4290
    },
    {
      id: "brk-3",
      caption: "Closing this chapter not with anger, but with gratitude for what it taught me.",
      category: "breakup",
      tags: ["closure", "chapter", "lesson"],
      likes: 2890
    },
    {
      id: "brk-4",
      caption: "You didn't break me; you just revealed how unbreakable my spirit truly is.",
      category: "breakup",
      tags: ["unbreakable", "strength", "rebirth"],
      likes: 3610
    }
  ],

  deep: [
    {
      id: "dp-1",
      caption: "We are all stories in the end. Just make sure yours is one worth telling.",
      category: "deep",
      tags: ["legacy", "story", "purpose"],
      likes: 3450
    },
    {
      id: "dp-2",
      caption: "The stars shine brightest in the pitch-black void. Find your light within the shadows.",
      category: "deep",
      tags: ["stars", "cosmos", "introspection"],
      likes: 2880
    },
    {
      id: "dp-3",
      caption: "Listen closely to what someone says about others; it mirrors who they truly are.",
      category: "deep",
      tags: ["wisdom", "humanity", "mirror"],
      likes: 3920
    },
    {
      id: "dp-4",
      caption: "Peace does not mean to be in a place where there is no noise; it means to be calm amidst the storm.",
      category: "deep",
      tags: ["peace", "calm", "zen"],
      likes: 3180
    }
  ],

  aesthetic: [
    {
      id: "aes-1",
      caption: "Golden hour hues, dried lavender notes, and quiet afternoon musings.",
      category: "aesthetic",
      tags: ["goldenhour", "lavender", "vintage"],
      likes: 2670
    },
    {
      id: "aes-2",
      caption: "Finding soft art in the quietest, unnoticed corners of the afternoon.",
      category: "aesthetic",
      tags: ["art", "minimalist", "soft"],
      likes: 3120
    },
    {
      id: "aes-3",
      caption: "Sipping earl grey tea while listening to the whisper of autumn wind.",
      category: "aesthetic",
      tags: ["autumn", "tea", "slowliving"],
      likes: 2480
    },
    {
      id: "aes-4",
      caption: "Curating a life that feels like warm sunlight through sheer white linen.",
      category: "aesthetic",
      tags: ["linen", "sunlight", "warmth"],
      likes: 3590
    }
  ],

  motivation: [
    {
      id: "mot-1",
      caption: "The mountain does not move because you complain. Climb it or stay at the base.",
      category: "motivation",
      tags: ["climb", "discipline", "noexcuses"],
      likes: 3950
    },
    {
      id: "mot-2",
      caption: "Do not wait until you feel ready. Action creates readiness, not the other way around.",
      category: "motivation",
      tags: ["action", "start", "courage"],
      likes: 4210
    },
    {
      id: "mot-3",
      caption: "Small daily disciplines repeated with obsession lead to monumental triumphs.",
      category: "motivation",
      tags: ["habit", "triumph", "focus"],
      likes: 3670
    }
  ],

  cute: [
    {
      id: "cute-1",
      caption: "You give my stomach butterflies and my face permanent dimple smiles.",
      category: "cute",
      tags: ["butterflies", "sweet", "dimples"],
      likes: 2840
    },
    {
      id: "cute-2",
      caption: "I like you a latte, sprinkled with extra warmth and cinnamon joy.",
      category: "cute",
      tags: ["latte", "coffee", "playful"],
      likes: 2310
    },
    {
      id: "cute-3",
      caption: "My cheeks hurt from smiling every time your name lights up my phone.",
      category: "cute",
      tags: ["smile", "phone", "crush"],
      likes: 3120
    }
  ],

  travel: [
    {
      id: "trv-1",
      caption: "Not all those who wander are lost; some are just finding themselves on secret coastlines.",
      category: "travel",
      author: "J.R.R. Tolkien",
      tags: ["wanderlust", "coast", "journey"],
      likes: 3820
    },
    {
      id: "trv-2",
      caption: "Fill your life with adventures, not things. Have stories to tell, not stuff to show.",
      category: "travel",
      tags: ["adventure", "memories", "explore"],
      likes: 3490
    },
    {
      id: "trv-3",
      caption: "Passport stamps fade, but the mountain air stays carved in your soul forever.",
      category: "travel",
      tags: ["mountains", "passport", "freedom"],
      likes: 2970
    }
  ],

  birthday: [
    {
      id: "bday-1",
      caption: "Another year bolder, wiser, and shining brighter than the candles on the cake.",
      category: "birthday",
      tags: ["birthday", "cheers", "celebration"],
      likes: 3200
    },
    {
      id: "bday-2",
      caption: "Grateful for 365 days of grace, laughter, and lessons. Chapter next begins now.",
      category: "birthday",
      tags: ["gratitude", "chapter", "milestone"],
      likes: 3640
    },
    {
      id: "bday-3",
      caption: "Here’s to another trip around the sun and making every single day count.",
      category: "birthday",
      tags: ["sun", "orbit", "toast"],
      likes: 2890
    }
  ]
};
