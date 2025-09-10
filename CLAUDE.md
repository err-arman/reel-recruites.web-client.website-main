# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server (Vite) on port 3000
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint with TypeScript rules
- `npm run preview` - Preview production build locally

### GraphQL Code Generation
- `npm run generate:gql` - Generate TypeScript types from GraphQL schema
- Run this after adding new GraphQL queries/mutations in `.tsx` files
- Generated types are stored in `src/_app/gql-types/`

## Architecture Overview

### Tech Stack
- **React 18 + TypeScript** with Vite build system
- **Mantine 7.x** UI components + **Tailwind CSS** for styling
- **Apollo Client** for GraphQL API communication
- **Jotai** for global state management
- **React Router v6** with custom route guards
- **Firebase Auth** for authentication

### Project Structure
```
src/
├── _app/                 # Core infrastructure (clients, config, utils)
├── dashboard/            # Protected dashboard routes (/dashboard/*)
├── pages/                # Public routes (/, /auth/*, /jobs/*, etc.)
├── root.router.tsx       # Main router configuration
└── RootApp.tsx          # App root with providers
```

### Key Patterns

#### GraphQL Integration
- All GraphQL operations use generated types from `src/_app/gql-types/`
- Apollo Client configured with JWT authentication in `src/_app/clients/apollo.client.ts`
- GraphQL queries/mutations are typically in `utils/query.gql.ts` files within each feature folder

#### Routing Architecture
- **Public routes** (`/`) - Landing, jobs, companies, auth flows
- **Protected routes** (`/dashboard/*`) - User dashboard, applications, profile management
- Route protection via `RouterGuard` component that checks authentication state

#### State Management
- User authentication state managed via Jotai atom in `src/_app/store/user.store.ts`
- Initial user loading via `ME_QUERY` in `RootApp.tsx`
- JWT tokens stored in localStorage, automatically injected into Apollo requests

#### Component Organization
- Shared components in `src/_app/common/components/`
- Feature-specific components in respective page/dashboard folders
- Layout components in `src/_app/common/layouts/`

### Environment Configuration
- Environment variables prefixed with `VITE_`
- GraphQL endpoint: `VITE_API` environment variable
- Firebase config variables for authentication

### File Upload System
- Uses Firebase Storage for video/image uploads
- Custom hooks in `src/_app/hooks/use-upload-file.ts`
- File URL generation utilities in `src/_app/utils/getFileUrl.ts`

### Video Features
- Video recording for job applications and profiles
- Custom video player components using `@graphland/react-video-player`
- Camera testing utilities in job interview flows

## Development Guidelines

### GraphQL Operations
- Always run `npm run generate:gql` after adding new GraphQL queries
- Use generated types for all GraphQL operations
- Place GraphQL operations in `utils/query.gql.ts` files within feature folders

### Authentication Flows
- Check authentication state via `userAtom` from Jotai
- Use `RouterGuard` for protecting routes
- JWT tokens automatically handled by Apollo Client setup

### Component Development
- Follow existing Mantine + Tailwind patterns
- Use TypeScript strict mode (enabled in tsconfig.json)
- Implement proper loading states and error handling for GraphQL operations

### Path Aliases
- Use `@/*` alias for imports from `src/` directory (configured in both Vite and TypeScript)

### Build Process
- TypeScript compilation happens before Vite build
- Linting includes TypeScript-specific ESLint rules
- Production builds optimized for deployment via Vercel/Docker