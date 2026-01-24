# HIBARR Trading Website

The official website for **HIBARR Trading** — a real estate investment platform specializing in North Cyprus properties. This platform connects international investors with high-yield property opportunities, offering expert guidance, flexible payment plans, and comprehensive investment packages.

## 🌐 Live Site

**Production:** [https://hibarr.de](https://hibarr.de)

## ✨ Features

### Core Functionality
- **Property Listings** — Browse curated North Cyprus properties including sea-view apartments, luxury villas, and investment opportunities
- **Investment Packages** — Explore exclusive property packages with flexible payment plans and guaranteed rental income options
- **Consultation Booking** — Schedule free consultations with HIBARR investment experts via Calendly integration
- **Webinars** — Register for live and recorded webinars on North Cyprus real estate investment strategies
- **E-book Downloads** — Access investment guides and educational materials
- **Blog** — Read market insights, investment tips, and North Cyprus real estate news (powered by Sanity CMS)
- **Client Testimonials & Case Studies** — Real success stories from satisfied investors
- **Careers** — Browse and apply for open positions at HIBARR

### Technical Features
- **Multi-language Support** — Full internationalization for English, German, Turkish, and Russian
- **Responsive Design** — Optimized for all device sizes with mobile-first approach
- **SEO Optimized** — Comprehensive meta tags, structured data (JSON-LD), and Open Graph support
- **Analytics Integration** — PostHog, Google Analytics 4, and Meta Pixel tracking
- **Performance Optimized** — Image optimization, lazy loading, caching headers, and Turbopack dev server

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** — React framework with App Router
- **[React 18](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** — Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** & **[GSAP](https://gsap.com/)** — Animation libraries
- **[Lucide React](https://lucide.dev/)** — Icon library

### Data & State Management
- **[TanStack React Query](https://tanstack.com/query)** — Server state management
- **[Formik](https://formik.org/)** + **[Yup](https://github.com/jquense/yup)** — Form handling and validation

### Content Management & Media
- **[Sanity CMS](https://www.sanity.io/)** — Headless CMS for blog and content
- **[Cloudinary](https://cloudinary.com/)** — Image and media optimization
- **[BunnyCDN](https://bunny.net/)** — HLS video streaming

### Analytics & Tracking
- **[PostHog](https://posthog.com/)** — Product analytics and feature flags
- **Google Tag Manager / GA4** — Web analytics
- **Meta Pixel** — Facebook/Instagram conversion tracking

### Infrastructure
- **[Infisical](https://infisical.com/)** — Secrets management
- **[MinIO](https://min.io/)** — Object storage
- **[Vercel](https://vercel.com/)** — Deployment platform

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [lang]/             # Internationalized routes
│   │   ├── (landing)/      # Homepage sections
│   │   ├── about/          # About HIBARR
│   │   ├── blog/           # Blog listing & posts
│   │   ├── careers/        # Job listings
│   │   ├── consultation/   # Consultation booking
│   │   ├── ebook/          # E-book landing page
│   │   ├── listings/       # Property listings
│   │   ├── our-packages/   # Investment packages
│   │   ├── webinar/        # Webinar registration
│   │   └── ...
│   └── api/                # API routes
├── components/             # Reusable React components
│   ├── analytics/          # Analytics components (GTM, Meta Pixel, etc.)
│   ├── ui/                 # UI primitives (buttons, dialogs, etc.)
│   └── ...
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and services
│   ├── content/            # Static content definitions
│   ├── services/           # API service layers
│   └── third-party/        # Third-party client integrations
├── providers/              # React context providers
└── types/                  # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun**
- **Infisical CLI** (for secrets management in development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hibarr-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file with the required environment variables. Contact the team for the necessary API keys and secrets, or use Infisical for automatic secret injection.

4. **Run the development server**
   ```bash
   npm run dev
   ```

   This uses Infisical to inject secrets and starts Next.js with Turbopack for fast refresh.

5. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Infisical secrets |
| `npm run build` | Build for production |
| `npm run build:infisical` | Build with Infisical secrets injection |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run build:analyze` | Build with bundle analyzer |

## 🌍 Internationalization

The website supports the following locales:

| Locale | Language |
|--------|----------|
| `en` | English |
| `de` | German |
| `tr` | Turkish |
| `ru` | Russian |

Language-specific routes are handled via the `[lang]` dynamic segment. Translations are managed through the translation service in `src/lib/services/translation.service.ts`.

## 📝 Content Management

Blog posts and dynamic content are managed through **Sanity CMS**. The Sanity client configuration is located in `src/lib/third-party/sanity.client.ts`.

## 🔒 Environment Variables

This project uses Infisical for secrets management. Key environment variables include:

- Sanity project credentials
- Cloudinary API keys
- PostHog API key
- Meta Pixel ID
- Google Analytics ID
- MinIO/S3 credentials
- Various API endpoints

## 📊 Analytics

The website implements comprehensive analytics:

- **PostHog** — User behavior, session recording, and feature flags
- **Google Analytics 4** — Traffic and conversion tracking
- **Meta Pixel** — Facebook/Instagram ad conversion tracking
- **Web Vitals** — Core Web Vitals monitoring

Analytics can be disabled by setting the `hibarr_noanalytics` cookie to `1`.

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes following the existing code style
3. Ensure ESLint passes (`npm run lint`)
4. Submit a pull request

## 📄 License

Proprietary — All rights reserved by HIBARR Trading.
