# Reel Recruite - Web Client Overview

## Project Summary

Reel Recruite is a React-based web application for video-first recruitment, connecting job seekers with employers through video profiles and interactive interview processes. The platform enables users to create video profiles, apply to jobs, and participate in video interviews.

## Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI Framework & Styling
- **Mantine 7.x** - Comprehensive UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **SCSS** - Enhanced CSS with variables and mixins
- **Tabler Icons** & **React Icons** - Icon libraries

### State Management & Data
- **Apollo Client** - GraphQL client for API communication
- **Jotai** - Atomic state management
- **React Hook Form** - Form state management
- **GraphQL Code Generator** - Type-safe GraphQL operations

### Routing & Navigation
- **React Router DOM v6** - Client-side routing
- **Custom Route Guards** - Authentication-based route protection

### Authentication & Security
- **Firebase Auth** - Authentication provider
- **JWT Tokens** - API authentication
- **hCaptcha** - Bot protection

### Media & Video
- **React Video Player** - Custom video components
- **Canvas Confetti** - Celebration animations
- **Swiper** - Touch slider component

## Project Structure

```
src/
├── _app/                    # Core application infrastructure
│   ├── clients/            # API clients (Apollo GraphQL)
│   ├── common/             # Shared components, layouts, utilities
│   ├── config/             # Configuration files
│   ├── guards/             # Route protection logic
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Global state management
│   └── utils/              # Utility functions
├── dashboard/              # Protected dashboard area
│   ├── applications/       # Job application management
│   ├── profile-videos/     # Video profile management
│   ├── profile/            # User profile settings
│   └── saved/              # Saved jobs
├── pages/                  # Public pages and authentication
│   ├── (auth)/             # Authentication flows
│   ├── companies/          # Company profiles
│   ├── jobs/               # Job listings and details
│   ├── interview-recording/ # Video interview features
│   └── home/               # Landing page
└── styles/                 # Global styles and SCSS
```

## Key Features

### Authentication System
- **Multi-provider OAuth** - Google, LinkedIn, Microsoft integration
- **Email/Password Authentication** - Traditional signup/signin
- **Route Protection** - Automatic redirection for protected pages
- **JWT Token Management** - Secure API communication

### User Management
- **Role-based Access** - Job seekers, recruiters, admin roles
- **Profile Management** - Complete user profiles with videos
- **Profile Videos** - Upload and manage video introductions
- **Skills & Experience** - Comprehensive profile building

### Job Platform
- **Job Listings** - Browse and search job opportunities
- **Company Profiles** - Detailed company information
- **Job Applications** - Apply with video profiles
- **Saved Jobs** - Bookmark interesting positions

### Video Interview System
- **Video Recording** - Browser-based video capture
- **Interview Onboarding** - Guided interview preparation
- **Video Playback** - Review recorded interviews
- **Camera Testing** - Pre-interview technical checks

### Dashboard Features
- **Application Tracking** - Monitor job application status
- **Video Management** - Organize profile videos
- **Settings Panel** - Account and privacy settings
- **Analytics** - Application and profile insights

## Route Architecture

### Public Routes (`/`)
- Landing page and marketing content
- Company profiles and job listings
- Authentication flows
- Public user profiles

### Protected Routes (`/dashboard`)
- User dashboard and analytics
- Application management
- Profile and video settings
- Saved jobs and preferences

### Interview Routes (Protected)
- `/interview-recording` - Video recording interface
- `/submit-video-interview` - Interview submission
- `/interview-onboard` - Interview preparation

## Authentication Flow

1. **Initial Load** - Check for existing authentication via GraphQL `ME_QUERY`
2. **Token Validation** - Verify JWT token in localStorage
3. **Route Protection** - `RouterGuard` component checks authentication
4. **Redirect Logic** - Preserve intended destination for post-login navigation
5. **State Management** - Store user data in global Jotai atom

## Development Workflow

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint checks
npm run generate:gql # Generate GraphQL types
```

### Code Generation
- **GraphQL Codegen** - Automatically generates TypeScript types from GraphQL schema
- **Type Safety** - All GraphQL operations are fully typed

### Environment Setup
- Development server runs on Vite with HMR
- GraphQL endpoint configuration via environment variables
- Firebase authentication configuration

## Security Features

- **Route Guards** - Prevent unauthorized access to protected areas
- **JWT Authentication** - Secure API communication
- **Input Validation** - Form validation with Yup schemas
- **CAPTCHA Protection** - Bot prevention on sensitive forms
- **Environment Variables** - Secure configuration management

## Performance Optimizations

- **Code Splitting** - Lazy loading of route components
- **Bundle Optimization** - Vite's efficient bundling
- **GraphQL Caching** - Apollo Client intelligent caching
- **Image Optimization** - Optimized asset loading
- **Component Memoization** - React performance optimizations

## Deployment

The application is configured for modern deployment platforms:
- **Vercel Configuration** - Ready for serverless deployment
- **Docker Support** - Container-based deployment
- **Nginx Configuration** - Production web server setup
- **Build Optimization** - Production-ready bundle generation

## API Integration

### GraphQL Architecture
- **Type-safe Operations** - Generated types for all GraphQL operations
- **Automatic Token Injection** - JWT tokens added to all requests
- **Error Handling** - Centralized GraphQL error management
- **Caching Strategy** - Intelligent query result caching

### File Uploads
- **Firebase Storage** - Secure file and video storage
- **Progress Tracking** - Upload progress indicators
- **Type Validation** - File type and size restrictions

## Browser Compatibility

- Modern browsers with ES6+ support
- Video recording requires MediaRecorder API
- WebRTC support for camera/microphone access
- localStorage for token persistence

## Contributing Guidelines

1. Follow TypeScript strict mode guidelines
2. Use existing component patterns and styling
3. Implement proper error handling and loading states
4. Add types for all new GraphQL operations
5. Test authentication flows and route protection
6. Ensure responsive design across devices

---

*This overview provides a comprehensive understanding of the Reel Recruite web client architecture, features, and development practices.*