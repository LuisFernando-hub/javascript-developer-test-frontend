# Frontend

Vue.js application using Vite, shadcn-vue conventions, Tailwind CSS, and Vue Router.

## Environment

Create the `.env` file from the example:

```bash
cp .env.example .env
```

Available variables:

```env
VITE_API_BASE_URL=http://localhost:3000
```

In production, use the public API URL:

```env
VITE_API_BASE_URL=https://api.example.com
```

If frontend and backend are deployed in the same Vercel project using the root `vercel.json`, leave it empty or omit it:

```env
VITE_API_BASE_URL=
```

For local development, Vite also supports:

```env
VITE_API_PROXY_TARGET=http://localhost:3000
VITE_DEV_SERVER_PORT=5173
```

## Running Locally

```bash
npm install
npm run dev
```

The Vue app will be available at:

```text
http://localhost:5173
```

## Production Build

```bash
npm install
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Routes

- `/pages/currency`
- `/pages/games`
- `/pages/slot`

## Structure

```text
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui/
│   ├── lib/
│   ├── pages/
│   │   ├── CurrencyPage.vue
│   │   ├── GamesPage.vue
│   │   └── SlotPage.vue
│   ├── router/
│   ├── App.vue
│   └── main.ts
├── .env.example
├── components.json
├── package.json
├── package-lock.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```
