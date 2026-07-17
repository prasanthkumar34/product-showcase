# Product Showcase

A product catalog app built with React and TypeScript — think of it as a simplified e-commerce browsing experience. You can search through products, filter by category, and check out individual product details. No backend involved; all the data is mocked locally so it's easy to run and test without setting up a database or API server.

I built this to demonstrate a clean React/TypeScript setup with proper component structure, client-side routing, and state management using Context API instead of Redux — since for a project of this size, Context API does the job without the extra boilerplate.

Live: https://product-showcase-six-kappa.vercel.app/


## Getting it running

You'll need Node.js (v20 or later) and npm installed.

```bash
npm install
npm run dev
```

That'll start the dev server, usually at `http://localhost:5173` — Vite will print the exact URL in your terminal.

A few other scripts you might need:
- `npm run build` — type-checks everything and builds for production
- `npm run preview` — lets you preview the production build locally
- `npm run lint` — runs the linter (Oxlint)

If you ever want to regenerate the mock product data from scratch, there's a script for that too:
```bash
node scripts/generate-products.mjs
```

## What's under the hood

- **React 19 + TypeScript** for the UI
- **Vite** as the build tool — fast dev server, quick builds
- **Tailwind CSS v4** for styling
- **React Router v7** for routing between pages
- **lucide-react** for icons
- **Context API + useReducer** for state (products, filters) — deliberately skipped Redux here
- Product data comes from a local JSON file, served through a mock service layer that adds artificial delay and can simulate errors, so it behaves like a real API call would

Color theme, if you're curious: primary indigo (`#4F46E5`), accent amber (`#F59E0B`), light gray background (`#F9FAFB`), Inter as the font.

## Pages

- `/` – Home page with hero section, a short company intro, and a few featured products
- `/products` – The main listing page. Search bar, category filter chips, pagination
- `/products/:id` – Product detail page with specs and related products
- Anything else redirects to a 404 page

Pages are lazy-loaded (`React.lazy` + `Suspense`) so the initial load stays light.

## Folder structure

src/
├── assets/            → logo, static stuff
├── components/
│   ├── common/         → Navbar, Footer, SearchBar, Pagination, etc. — reused everywhere
│   ├── home/            → Hero, CompanyIntro, FeaturedProducts
│   └── products/        → ProductCard, ProductGrid, CategoryFilter, SpecsTable, RelatedProducts
├── context/            → ProductContext and FilterContext
├── data/
│   └── products.json    → 100 mock products
├── hooks/              → custom hooks — context consumers, debounce, filtering logic, detail/related fetches
├── pages/              → the actual route-level pages
├── services/
│   └── productService.ts → mock API layer (delay + optional simulated errors)
├── types/
│   └── product.ts
├── utils/
│   └── constants.ts    → categories list, page size, API delay/error settings
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

---

## Assumptions

- Since no backend or public API was mandated, product data is served from a local JSON file through a service layer that simulates network latency and can simulate failure (for testing error states), so the app behaves like it's talking to a real API.
- Images are generated via Picsum placeholder URLs (seeded by product ID) rather than real product photography, since real images weren't provided.
- Cart/checkout functionality was intentionally out of scope — the brief asked for browsing, search, filtering, and detail views only.
- Pagination was chosen over infinite scroll for clearer state management and easier UX testing within the given scope.

---

## Future Improvements

- Replace mock service layer with a real backend (Node/Express + database) or a public product API
- If we need to save the data in database then MySQL is better option because products follow the relational datas and fixed schemas so i will prefer MySQL with proper indexing for query optimization.
-We need proper Signup and Login flow with the authentication and authorization
-We can implement seperate admin module for handling the user roles and adding or updating the products
- Add cart and checkout flow
- Add unit/integration tests (Jest + React Testing Library)
- Add dark mode via the existing theme pattern
- Add sorting (price, rating) alongside search and category filtering
- Persist filters/search in URL query params for shareable/bookmarkable searches

