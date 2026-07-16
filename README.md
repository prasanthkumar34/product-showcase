# Product Showcase

A React + TypeScript catalog app for browsing products across six categories. Data is mocked locally (JSON + a delayed service layer) so the UI can be developed without a backend.

## Setup

**Requirements:** Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

| Script | What it does |
|--------|----------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

Optional: regenerate `src/data/products.json` with:

```bash
node scripts/generate-products.mjs
```

## Stack

| Layer | Choice |
|-------|--------|
| UI | React 19 + TypeScript |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing | React Router DOM 7 |
| Icons | lucide-react |
| Lint | Oxlint |
| State | React Context + `useReducer` / `useState` (no Redux) |
| Data | Local `products.json` via `productService` (mock latency / optional errors) |

**Theme:** primary `#4F46E5`, accent `#F59E0B`, background `#F9FAFB`, font Inter.

## Routes

| Path | Page |
|------|------|
| `/` | Home — hero, about, featured products |
| `/products` | Listing — search, category chips, pagination |
| `/products/:id` | Detail — specs, related products |
| `*` | 404 |

Route pages are lazy-loaded with `React.lazy` / `Suspense`.

## Folder structure

```
src/
├── assets/                 # Static assets (logo)
├── components/
│   ├── common/             # Navbar, Footer, SearchBar, Pagination, LazyImage, …
│   ├── home/               # Hero, CompanyIntro, FeaturedProducts
│   └── products/           # ProductCard, ProductGrid, CategoryFilter, SpecsTable, …
├── context/                # ProductContext, FilterContext
├── data/
│   └── products.json       # 100 mock products
├── hooks/                  # Context hooks, debounce, filtering, detail/related fetches
├── pages/                  # Route-level screens
├── services/
│   └── productService.ts   # Mock API (delay + optional error rate)
├── types/
│   └── product.ts
├── utils/
│   └── constants.ts        # Categories, page size, API_DELAY_MS, API_ERROR_RATE
├── App.tsx
├── main.tsx
└── index.css
```

## How data works

- `ProductProvider` loads all products once via `getAllProducts()`.
- Listing filters/pagination use `FilterContext` + `useFilteredProducts`.
- Detail and related sections fetch through `getProductById` / `getRelatedProducts` (still mocked).
- Images use `https://picsum.photos/seed/product-{id}/600/600`.

To simulate failures (for Retry / error UI), set in `src/utils/constants.ts`:

```ts
export const API_ERROR_RATE = 1 // every request fails
```

Reset to `0` for normal use. Latency is controlled by `API_DELAY_MS` (default `500`).

## Assumptions

- No real backend, auth, cart, or checkout — catalog browse only.
- Product IDs are stable integers in `products.json`.
- Categories are fixed in `CATEGORIES`; chips do not invent new categories from data.
- Search matches product **name** only (case-insensitive).
- Featured products are a random sample of four, memoized until the products array changes.
- Picsum images require network access; offline, images will fail to load but the rest of the UI still works.
- Brand icons (GitHub / LinkedIn) are represented with generic lucide icons because current lucide-react builds omit brand glyphs.

## Future improvements

- Replace the mock service with a real REST/GraphQL API and keep the same service surface.
- If we need to save the data in database then MySQL is better option because products follow the relational datas and fixed schemas so i will prefer MySQL with proper indexing for query optimization
- Persist filters/search in the URL query string for shareable listing views.
- Add sorting (price, rating) and richer search (description, category).
- Cart / wishlist and a simple checkout flow.
- Image CDN or local assets instead of Picsum; blur placeholders / srcset.
- Unit tests for hooks (`useFilteredProducts`, `useProductDetail`) and a few RTL page tests.

