# Image Converter

Client-side image converter built with Next.js (App Router). Converts images in the browser using the Canvas API and stores results in IndexedDB.

**Live:** [image-converter-iota-ashen.vercel.app](https://image-converter-iota-ashen.vercel.app)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Package manager:** pnpm
- **State:** Redux Toolkit + Redux Saga
- **i18n:** next-intl (uk / en)
- **Dates:** dayjs + localizedFormat
- **Styles:** Sass, CSS variables (light/dark theme)
- **Icons:** Heroicons
- **Storage:** IndexedDB (idb)
- **Fonts:** Geist (next/font)

## Features

- **Conversion:** Upload images (PNG, JPEG, WEBP), choose output format, convert via Canvas, download, save to history
- **History:** Stored in IndexedDB; preview, filename, size, created/expiry date; delete item, reconvert, clear all
- **Storage rules:** Items expire after 7 days (auto-deleted); total storage usage shown
- **Settings:** Theme (light/dark) and language (uk/en) persisted in cookies

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to the default locale (`/uk`).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `pnpm dev`      | Start dev server         |
| `pnpm build`    | Production build         |
| `pnpm start`    | Start production server  |
| `pnpm lint`     | Run ESLint               |
| `pnpm lint:fix` | ESLint with auto-fix     |
| `pnpm format`   | Format with Prettier     |
| `pnpm format:check` | Check Prettier       |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # Locale-based routes (uk, en)
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Converter
│   │   └── history/page.tsx
│   ├── layout.tsx          # Root layout (theme, lang from cookies/headers)
│   └── globals.scss
├── components/
│   ├── common/             # Button, Container, ThemeToggle, LanguageSwitcher, etc.
│   ├── converter/          # UploadZone, FormatSelector, ResultCard, UploadPreviewList
│   └── history/            # HistoryList, HistoryCard, StorageUsage, ClearAllButton
├── modules/                # Page-level modules (Converter, History)
├── store/                  # Redux (slices, sagas, makeStore)
├── services/
│   ├── db/                 # IndexedDB (historyRepository)
│   ├── image/              # Canvas-based imageConverter
│   └── cookies/            # Theme & locale cookies
├── utils/                  # dayjs config, fileName, saveAs, converterFormats
├── types/
├── i18n/                   # request.ts, routing.ts
└── messages/               # uk.json, en.json
```

## Localization

- Locales: `uk` (default), `en`
- Messages: `src/messages/uk.json`, `src/messages/en.json`
- dayjs locale is set globally when language changes (Container + `setDayjsLocale`)

## Theme

- Light/dark via CSS variables; theme stored in cookie and applied on server in root layout
- Accent and palette inspired by Binance-style tokens
