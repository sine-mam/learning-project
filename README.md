# Headless WordPress + Next.js + TailwindCSS

This project is a starter template for building a headless WordPress frontend using Next.js and TailwindCSS.

## Features

- Next.js (App Router, TypeScript)
- TailwindCSS
- ESLint
- Example demo: Fetch and display posts from a WordPress REST API

## Getting Started

1. Install dependencies (already done):

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Example Demo

- The homepage fetches and displays posts from a WordPress REST API (see `src/app/page.tsx`).
- Replace the endpoint in the code with your own WP site for production use.

## Customization

- Update the WordPress API endpoint in the demo page to connect to your own site.
- Style components using TailwindCSS classes.

---

Replace any placeholder endpoints with your actual WordPress site URL for production use.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Development Guide

## Local Development
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view your site.

## Project Structure
- `src/app/page.tsx`: Homepage, fetches ACF fields from WordPress via WPGraphQL. Uses `Header` and `Footer` components.
- `src/app/Header.tsx`: Site header with navigation and dark/light mode toggle.
- `src/app/Footer.tsx`: Site footer.
- `src/app/blog/page.tsx`: Blog listing, fetches posts from WordPress.
- `src/app/[slug]/page.tsx`: Dynamic pages, fetch content from WordPress by URI.
- `src/app/layout.tsx`: Global layout wrapper (add header/footer here for all pages if desired).
- `public/`: Static assets (SVGs, images).
- `globals.css`: Global styles (TailwindCSS).

## WordPress Setup
1. **Install Plugins**
   - WPGraphQL
   - Advanced Custom Fields (ACF)
   - WPGraphQL for ACF
2. **Create Pages**
   - Home, About, Contact, etc.
   - Set Home as the front page in WordPress settings.
3. **Create ACF Field Groups**
   - Add fields (e.g., heroTitle, heroDescription, feature1, feature2, feature3) to the Home page.
   - Enable "Show in GraphQL" for the field group and each field.
   - Set location to "Page is equal to Home".
4. **Fill in ACF fields**
   - Edit the Home page and fill out your custom fields.

## Customization
- Update GraphQL queries in Next.js to match your ACF field names and types.
- Use TailwindCSS classes to style components and layouts.
- Add new pages in WordPress; they will be available at `/your-slug` automatically.
- To use a global header/footer on all pages, import `Header` and `Footer` in `layout.tsx`.

## Troubleshooting
- If ACF fields do not appear, check:
  - WPGraphQL and WPGraphQL for ACF plugins are active.
  - Field group and fields have "Show in GraphQL" enabled.
  - The correct URI or ID is used in GraphQL queries.
- Use the GraphiQL IDE in WordPress admin to test queries.

## Deployment
- Deploy to Vercel or any platform supporting Next.js.
- Ensure your WordPress site and GraphQL endpoint are publicly accessible.

---
For more help, see Next.js, TailwindCSS, and WPGraphQL documentation.
