# Next.js 16+ with Material UI

A modern, responsive web application built with Next.js 16+, Material UI, and TypeScript.

## 🚀 Features

- ⚡ **Next.js 16+** - Latest Next.js with App Router
- 🎨 **Material UI** - Beautiful, customizable components
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive** - Mobile-first design with drawer navigation
- 🔄 **Server Components** - Async data fetching with Server Components
- 🛣️ **Dynamic Routing** - File-based routing with dynamic parameters
- 🧩 **Component Library** - 10+ reusable UI components
- ✨ **TypeScript** - Full type safety
- 🎯 **ESLint & Prettier** - Code quality and formatting

## 📦 Tech Stack

- **Framework**: Next.js 16+
- **UI Library**: Material UI (MUI) v5
- **Language**: TypeScript
- **Styling**: Emotion (CSS-in-JS)
- **Code Quality**: ESLint + Prettier

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── components/        # Component library demo page
│   ├── users/            # Users list and detail pages
│   │   └── [id]/        # Dynamic user detail route
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── providers.tsx    # Client-side providers
├── components/
│   ├── layout/          # Layout components (Header, Footer, AppLayout)
│   └── ui/              # Reusable UI components
├── context/             # React Context providers
│   └── ColorModeContext.tsx
├── lib/                 # Utility functions and data fetching
│   └── users.ts
└── theme/               # MUI theme configuration
    └── theme.ts
```

## 🎯 Available Pages

- **/** - Home page with overview
- **/users** - Users list (async Server Component)
- **/users/[id]** - Individual user details (dynamic route)
- **/components** - Component library showcase
- **/about** - About the project
- **/contact** - Contact form

## 🧩 Component Library

### UI Components

- **AppButton** - Custom button with loading state
- **StatusBadge** - Status indicator with color variants
- **AppAlert** - Alert/notification component
- **StatCard** - Statistics display card
- **UserCard** - User profile card
- **EmptyState** - Empty state placeholder
- **LoadingSpinner** - Loading indicator
- **PageHeader** - Page header with breadcrumbs
- **ThemeToggle** - Dark/light mode toggle

### Layout Components

- **Header** - App bar with navigation (desktop + mobile drawer)
- **Footer** - Page footer
- **AppLayout** - Global layout wrapper

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## 🎨 Theming

The app includes a custom Material UI theme with light and dark mode support:

- Theme configuration: `src/theme/theme.ts`
- Mode toggle: `src/components/ui/ThemeToggle.tsx`
- Context provider: `src/context/ColorModeContext.tsx`

### Features:
- Auto-detects system color scheme on first visit
- Persists preference to localStorage
- Seamless switching with no flash

## 📝 Code Quality

### ESLint

```bash
npm run lint
```

### Prettier

```bash
npm run format
```

Configuration files:
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier configuration

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

The build output will be in the `.next` directory.

## 🧪 Key Implementation Details

### Server Components

By default, all components in the `app` directory are Server Components:
- `app/users/page.tsx` - Fetches users server-side
- `app/users/[id]/page.tsx` - Fetches individual user data

### Client Components

Components using hooks or browser APIs use `'use client'`:
- `components/layout/Header.tsx` - Navigation with state
- `components/ui/ThemeToggle.tsx` - Theme switching
- `app/contact/page.tsx` - Form with state management

### Dynamic Routes

The `[id]` folder creates dynamic routes:
- `/users/1` → renders `app/users/[id]/page.tsx` with `params.id = '1'`
- Includes dynamic metadata generation
- Handles 404s with `notFound()`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Material UI Documentation](https://mui.com/material-ui/getting-started/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
