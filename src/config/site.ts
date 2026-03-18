export const siteConfig = {
  name: "Number Base Converter",
  title: "Number Base Converter — Convert Between Binary, Octal, Decimal, Hex & More",
  description: "Instantly convert numbers between binary, octal, decimal, hexadecimal, and any custom base (2–36). Free, fast, no signup required.",
  url: "https://number-base-converter.tools.jagodana.com",
  ogImage: "/opengraph-image",

  headerIcon: "Hash",
  brandAccentColor: "#8b5cf6",

  keywords: [
    "number base converter",
    "binary to decimal",
    "hex converter",
    "octal converter",
    "base converter online",
    "radix converter",
    "binary hex decimal",
    "number system converter",
  ],
  applicationCategory: "DeveloperApplication",

  themeColor: "#7c3aed",

  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  socialProfiles: [
    "https://twitter.com/jagodana",
  ],

  links: {
    github: "https://github.com/Jagodana-Studio-Private-Limited/number-base-converter",
    website: "https://jagodana.com",
  },

  footer: {
    about: "A free, instant number base converter for developers. Convert between binary, octal, decimal, hexadecimal, and any base from 2 to 36 — right in your browser.",
    featuresTitle: "Features",
    features: [
      "Convert between any bases (2–36)",
      "Real-time conversion as you type",
      "Support for large numbers via BigInt",
      "One-click copy to clipboard",
    ],
  },

  hero: {
    badge: "Free Developer Tool",
    titleLine1: "Convert Numbers Between",
    titleGradient: "Any Base Instantly",
    subtitle: "Binary, octal, decimal, hexadecimal, or any custom base from 2 to 36. Type a number and see all conversions in real time — no signup, no API, 100% in-browser.",
  },

  featureCards: [
    {
      icon: "🔢",
      title: "All Standard Bases",
      description: "Binary (2), Octal (8), Decimal (10), and Hexadecimal (16) — the bases every developer needs.",
    },
    {
      icon: "⚡",
      title: "Real-Time Conversion",
      description: "See results instantly as you type. No button clicks, no waiting — just fast, live conversion.",
    },
    {
      icon: "🎯",
      title: "Custom Base Support",
      description: "Need Base-32 or Base-7? Enter any radix from 2 to 36 and convert freely between them.",
    },
  ],

  relatedTools: [
    {
      name: "Hash Generator",
      url: "https://hash-generator.tools.jagodana.com",
      icon: "🔐",
      description: "Generate MD5, SHA-1, SHA-256 hashes instantly.",
    },
    {
      name: "UUID Generator",
      url: "https://uuid-generator.tools.jagodana.com",
      icon: "🆔",
      description: "Generate UUIDs v4 with one click.",
    },
    {
      name: "JSON Formatter",
      url: "https://json-formatter.tools.jagodana.com",
      icon: "📋",
      description: "Format and validate JSON data instantly.",
    },
    {
      name: "Regex Playground",
      url: "https://regex-playground.tools.jagodana.com",
      icon: "🧪",
      description: "Build, test & debug regular expressions in real-time.",
    },
    {
      name: "Timestamp Converter",
      url: "https://timestamp-converter.tools.jagodana.com",
      icon: "⏰",
      description: "Convert between Unix timestamps and human-readable dates.",
    },
    {
      name: "URL Encoder/Decoder",
      url: "https://url-encoder-decoder.tools.jagodana.com",
      icon: "🔗",
      description: "Encode and decode URLs with ease.",
    },
  ],

  howToSteps: [
    { name: "Enter a number", text: "Type your number in any of the input fields — binary, octal, decimal, hex, or a custom base.", url: "" },
    { name: "See instant conversions", text: "All other base fields update in real time as you type. No button clicks needed.", url: "" },
    { name: "Copy the result", text: "Click the copy icon next to any field to copy the converted value to your clipboard.", url: "" },
  ],
  howToTotalTime: "PT1M",

  faq: [
    {
      question: "What number bases are supported?",
      answer: "This tool supports all bases from 2 to 36. The most common ones — binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16) — have dedicated fields. You can also add a custom base field for any radix between 2 and 36.",
    },
    {
      question: "Can it handle very large numbers?",
      answer: "Yes! The converter uses JavaScript BigInt under the hood, so it can handle arbitrarily large integers without precision loss.",
    },
    {
      question: "Is my data sent to any server?",
      answer: "No. All conversions happen entirely in your browser. No data is sent anywhere — your numbers stay on your machine.",
    },
    {
      question: "What characters are valid for each base?",
      answer: "For bases 2–10, you can use digits 0 through (base-1). For bases 11–36, letters A–Z (case-insensitive) extend the digit set. For example, hexadecimal uses 0–9 and A–F.",
    },
  ],

  pages: {
    "/": {
      title: "Number Base Converter — Binary, Octal, Decimal, Hex & Custom Bases",
      description: "Instantly convert numbers between binary, octal, decimal, hexadecimal, and any custom base (2–36). Free, fast, no signup required.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
