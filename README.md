# FitTrack-Host-UI

Host shell for the **FitTrack** fitness tracker. This is the entry-point React app that renders the login flow, the dashboard chrome (sidebar + top bar), and mounts feature micro-frontends over Webpack Module Federation.

Feature pages (activities, nutrition, analytics, goals, FitoAI chat, profile) are served from a separate remote — `ContentMF` — and lazy-loaded at runtime. The host itself only owns auth, routing, user state, and the dashboard layout.

## Tech stack

- **React 19** + **TypeScript 5.9** (strict mode, React Compiler via Babel plugin)
- **Webpack 5** with `ModuleFederationPlugin` for the production/dev shell (`npm run dev` / `npm run build`)
- **Vite 7** as an alternative dev pipeline (`npm run dev:vite` / `npm run build:vite`) — useful for quick iteration without spinning up the remotes
- **Tailwind CSS v4** + **shadcn/ui** (zinc/emerald dark theme, Lucide icons)
- **TanStack Query** for async server state, **Zustand** for the in-memory user store, **Axios** for HTTP
- **React Router v7** for routing, **Sonner** for toasts

## Project layout

```
src/
├── App.tsx                    # Router + routes (PublicRoute / ProtectedRoute)
├── bootstrap.tsx              # Mounts <App/> under QueryClientProvider
├── main.tsx                   # Async boundary required by Module Federation
├── components/
│   ├── LoginPage.tsx          # Combined login + sign-up card
│   ├── ProtectedRoute.tsx     # Validates token, hydrates user store
│   ├── PublicRoute.tsx        # Bounces authenticated users to /dashboard
│   ├── dashboard/
│   │   ├── DashboardPage.tsx  # Dashboard shell; owns the active menu item
│   │   ├── Sidebar.tsx        # Collapsible right-side nav
│   │   └── MainContent.tsx    # Top bar + remote MF slot
│   └── ui/                    # shadcn primitives (button, input, card, label, sonner)
├── constants/appConstants.ts  # BASE_API_URL, dashboard base path
├── lib/
│   ├── remoteLoader.tsx       # Suspense wrapper + spinner for remotes
│   └── utils.ts               # `cn()` classname helper
├── model/                     # LoginUserData, RegisterUserData, UserDataResponse
├── services/
│   ├── api/authApi.tsx        # axios calls: register / login / validateToken
│   └── hooks/authHook.tsx     # React Query wrappers for the above
├── store/userStore.ts         # Zustand store holding the logged-in user
└── utils.ts                   # QueryClient + authToken localStorage helpers
```

## Routing

| Path           | Guard           | Component       |
| -------------- | --------------- | --------------- |
| `/`            | `PublicRoute`   | `LoginPage`     |
| `/:menuItem`   | `ProtectedRoute`| `DashboardPage` |

`:menuItem` ∈ `{dashboard, activities, nutrition, analytics, goals, fitoai, profile}` — all forwarded to the `ContentMF` remote, which decides what to render from the `currentPath` prop.

## Auth flow

1. `LoginPage` posts to the user-service (`POST /api/auth/register` or `POST /api/auth/login`) and stores the returned JWT in `localStorage` under `authToken`.
2. `ProtectedRoute` fires `GET /api/auth/validateToken` with `Authorization: Bearer <token>` on every page load. A valid response is written into the Zustand user store; any failure removes the token, toasts, and redirects to `/`.
3. `PublicRoute` does the inverse — if there's a valid token, it redirects into `/dashboard` so you can't see the login page while logged in.

The backend is expected at `BASE_API_URL` (see `src/constants/appConstants.ts`, defaults to `http://localhost:8071/api` — calls go directly to `FitTrack-user-service`; there is no API gateway in the MVP).

## Module Federation

Declared in `webpack.config.cjs`:

```js
new ModuleFederationPlugin({
  name: "fitTrackHost",
  remotes: {
    ContentMF: "ContentMF@http://localhost:3001/remoteEntry.js",
  },
  shared: {
    react:        { singleton: true, eager: true },
    "react-dom":  { singleton: true, eager: true },
    "react-router":{ singleton: true, eager: true },
  },
})
```

The host imports the remote lazily from `DashboardPage.tsx`:

```ts
const ContentApp = lazy(() => import("ContentMF/ContentMF"));
```

`RemoteWrapper` (from `src/lib/remoteLoader.tsx`) provides a Suspense boundary with an emerald spinner while the remote chunk loads.

## Prerequisites

- Node.js **20+**
- The `ContentMF` remote running on `http://localhost:3001`
- The FitTrack API gateway reachable at `BASE_API_URL` (default `http://localhost:8071`)

## Run locally

```bash
npm install

# Webpack dev server with Module Federation wired up (recommended)
npm run dev
# → http://localhost:3000

# Or: Vite, without Module Federation (faster HMR, remotes unavailable)
npm run dev:vite
```

## Build

```bash
npm run build       # webpack production build → dist/
npm run build:vite  # vite build (tsc + vite) → dist/
```

## Lint

```bash
npm run lint
```

## Related FitTrack services

- [`FitTrack-user-service`](https://github.com/sachin-gupta99/FitTrack-user-service) — auth + user profiles (Spring Boot)
- [`FitTrack-eureka-service`](https://github.com/sachin-gupta99/FitTrack-eureka-service) — service registry
- `ContentMF` — remote that serves the dashboard, activities, nutrition, analytics, goals, profile, and FitoAI pages
