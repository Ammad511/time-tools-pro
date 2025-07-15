# TimeTools Pro - Professional Time and Date Utilities

## Overview

TimeTools Pro is a comprehensive web application that provides professional time and date utilities. Built as a full-stack application with a React frontend and Express backend, it offers 10 different time-related tools including Unix timestamp conversion, world clock, timezone conversion, and more. The application is designed with a modern, responsive UI using shadcn/ui components and supports both light and dark themes.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **January 15, 2025**: Added immersive full-screen hero section with mouse-responsive parallax background
- **January 15, 2025**: Implemented floating glowing particles using Canvas animation responsive to cursor
- **January 15, 2025**: Added smooth scrolling and auto-reveal functionality for tool sections
- **January 15, 2025**: Enhanced tool selector with better mobile responsiveness and visual feedback
- **January 15, 2025**: Added loading transitions and URL hash support for direct tool links
- **January 15, 2025**: Created responsive SEO-optimized blog page with search, filtering, and structured data
- **January 15, 2025**: Added blog section to home page and navigation links throughout the site

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite for development and build processes
- **Routing**: Wouter for client-side routing
- **State Management**: React Context for theme management, TanStack Query for server state
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for schema management
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Storage**: PostgreSQL-based sessions using connect-pg-simple
- **Development**: In-memory storage fallback for development

### Build and Development
- **Development Server**: Vite dev server with HMR integration
- **Production Build**: ESBuild for server bundling, Vite for client bundling
- **Type Checking**: TypeScript with strict mode enabled
- **Development Tools**: Replit-specific plugins for development environment

## Key Components

### Time Utilities
The application provides 10 core time tools with enhanced user experience:
1. **Epoch/Unix Timestamp Converter** - Convert between Unix timestamps and human-readable dates
2. **World Clock** - Display current time across multiple time zones
3. **Timezone Converter** - Convert time between different time zones
4. **Countdown Timer** - Create customizable countdown timers
5. **Age Calculator** - Calculate exact age in various units
6. **Time Difference Calculator** - Calculate differences between two dates/times
7. **Date Generator** - Generate random dates for testing
8. **Week Number Finder** - Find ISO week numbers for dates
9. **Working Days Calculator** - Calculate business days between dates
10. **Time API** - Mock API endpoints for time-related data

### Enhanced User Experience Features
- **Immersive Hero Section**: Full-screen (100vh) header with mouse-responsive parallax background
- **Interactive Particles**: Canvas-based floating glowing particles that respond to cursor movement
- **Smooth Tool Transitions**: Clicking tool buttons automatically scrolls and reveals the selected tool
- **URL Hash Support**: Direct links to specific tools (e.g., `/tools#epoch-converter`)
- **Loading Indicators**: Smooth transition animations between tools
- **Mobile Optimization**: Responsive design with touch-friendly interactions

### UI Components
- Comprehensive shadcn/ui component library including forms, dialogs, navigation, and data display components
- Theme system supporting light/dark modes with CSS custom properties
- Responsive design optimized for mobile and desktop
- FontAwesome icons for consistent iconography

### Navigation and Layout
- Sticky navigation bar with theme toggle
- Tool selector interface for easy switching between utilities
- Footer with organized links and branding
- SEO-optimized head management for each page
- Blog page with search functionality and category filtering
- Responsive blog post cards with hover effects and structured data

### Blog Features
- **SEO-Optimized Content**: Structured HTML with proper headings, meta descriptions, and schema markup
- **Search and Filter**: Real-time search functionality with category-based filtering
- **Responsive Design**: Mobile-friendly layout with hover effects and smooth transitions
- **Sample Content**: 5 pre-populated blog posts with relevant time/date development topics
- **Easy Updates**: Simple array-based content structure for manual updates
- **Performance**: Optimized loading with lazy image loading and efficient filtering

## Data Flow

### Client-Side Data Flow
1. User interactions trigger React state updates
2. Form data is managed by React Hook Form with Zod validation
3. Time calculations are performed locally using utility functions
4. TanStack Query manages any server-side data fetching
5. Theme preferences are persisted to localStorage

### Server-Side Data Flow
1. Express middleware handles CORS, JSON parsing, and request logging
2. Routes are organized under `/api` prefix for API endpoints
3. Database operations use Drizzle ORM with type-safe queries
4. Session management through PostgreSQL-backed storage
5. Development fallback uses in-memory storage

### Database Schema
Currently defines a basic user schema with:
- `users` table with id, username, and password fields
- Drizzle-generated TypeScript types for type safety
- Zod schemas for runtime validation

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **State Management**: TanStack Query for server state
- **Utilities**: date-fns for date manipulation, clsx for conditional classes

### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Database**: Drizzle ORM, Neon Database driver
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution, Vite for development server

### Development Tools
- **Build Tools**: Vite, ESBuild, PostCSS with Tailwind
- **Type Checking**: TypeScript with strict configuration
- **Replit Integration**: Specialized plugins for Replit environment

## Deployment Strategy

### Development Environment
- Uses Vite development server with HMR
- Integrates Express server as middleware in development
- Environment variables loaded from `.env` files
- Database migrations handled through Drizzle Kit

### Production Build
1. **Client Build**: Vite builds React application to `dist/public`
2. **Server Build**: ESBuild bundles Express server to `dist/index.js`
3. **Static Assets**: Served from built client directory
4. **Database**: PostgreSQL connection via environment variable

### Environment Configuration
- Development: In-memory storage, Vite dev server
- Production: PostgreSQL database, static file serving
- Database URL required via `DATABASE_URL` environment variable
- Build outputs separated for client and server assets

The application is designed to be deployed on platforms supporting Node.js with PostgreSQL databases, with specific optimizations for Replit deployment environment.