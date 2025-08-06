# RA Ticketing System - React Migration

This is the React version of the RA Ticketing System, migrated from Angular 19+ to React 19+ with modern architecture and comprehensive features.

## 🚀 Features

- **Modern React 19+** with TypeScript
- **Vite** for fast development and building
- **Ant Design** UI components with custom theme
- **TailwindCSS** for utility-first styling
- **Zustand** for lightweight state management
- **React Query (TanStack Query)** for server state management
- **React Router** for client-side routing
- **Internationalization** (English/Arabic) with react-i18next and RTL support
- **React Hook Form** with Zod validation
- **Axios** for HTTP requests
- **Day.js** for date manipulation
- **Feature-based architecture** for scalable development

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── features/           # Feature-based modules
│   ├── auth/          # Authentication system
│   ├── admin/         # Admin functionality
│   ├── calendar/      # Calendar feature
│   ├── dashboard/     # Dashboard
│   └── cases/         # Case management
├── shared/            # Shared components & utilities
│   ├── components/    # Reusable UI components
│   │   ├── common/    # Common components
│   │   ├── guards/    # Route guards
│   │   └── layout/    # Layout components
│   ├── stores/        # Zustand state stores
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   └── constants/     # Application constants
├── config/            # Configuration files
├── assets/            # Static assets
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_TITLE=RA Ticketing System
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
GENERATE_SOURCEMAP=true
```

### Vite Configuration

The project uses Vite with:
- **Path Aliases**: Clean import organization
- **API Proxy**: Development server proxy for API calls
- **Code Splitting**: Manual chunks for vendor libraries
- **Environment Variables**: Runtime configuration

### TailwindCSS

Custom theme configuration with:
- **Primary Color**: `#4f008c` (purple theme)
- **Font Family**: Inter (Google Fonts)
- **Custom Colors**: Extended color palette
- **RTL Support**: Direction-aware styling
- **Form Plugin**: Enhanced form styling

### TypeScript

Path aliases configured for better import organization:
- `@/*` → `src/*`
- `@shared-components/*` → `src/shared/components/*`
- `@features/*` → `src/features/*`
- `@shared-stores/*` → `src/shared/stores/*`
- `@shared-hooks/*` → `src/shared/hooks/*`
- `@shared-utils/*` → `src/shared/utils/*`
- `@shared-types/*` → `src/shared/types/*`

## 🌐 Internationalization

The application supports English and Arabic languages with full RTL support.

### Features
- **Language Detection**: Automatic browser language detection
- **RTL Support**: Automatic direction switching for Arabic
- **Dynamic Loading**: Lazy-loaded translation files
- **Context Switching**: Runtime language switching

### Adding Translations

1. Add new keys to translation files
2. Use the `useTranslation` hook in components:

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t, i18n } = useTranslation();
  return <h1>{t('COMMON.TITLE')}</h1>;
};
```

## 📱 Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run build:prod` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run type-check` - TypeScript type checking

## 🎨 Design System

### Colors
- **Primary**: `#4f008c` (purple)
- **Primary Light**: `#e5d9ee`
- **Success**: `#52c41a`
- **Warning**: `#faad14`
- **Error**: `#ff4d4f`
- **Info**: `#1890ff`

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Line Height**: 1.5
- **Font Synthesis**: Disabled for better rendering

### Components
- **Ant Design Integration**: Custom theme overrides
- **Custom Scrollbars**: Styled webkit scrollbars
- **RTL Support**: Full bidirectional text support

## 🔐 Authentication & Authorization

### Features
- **Protected Routes**: Authentication guards
- **Role-based Access**: Admin-only routes
- **Session Management**: Persistent authentication state
- **Loading States**: Proper authentication checking

### Route Protection
```typescript
<ProtectedRoute requiredRoles={['ADMIN']}>
  <Admin />
</ProtectedRoute>
```

## 📊 State Management

### Zustand Stores
- **Notification Store**: App-wide notifications
- **Page Store**: Navigation and page state
- **Modal Store**: Modal state management

### React Query
- **Server State**: Efficient data fetching and caching
- **Background Updates**: Automatic data synchronization
- **Error Handling**: Graceful error states
- **Loading States**: Built-in loading indicators

## 🚀 Performance Features

### Code Splitting
- **Lazy Loading**: Route-based code splitting
- **Suspense Boundaries**: Loading states for async components
- **Manual Chunks**: Vendor library optimization

### Build Optimization
- **Tree Shaking**: Unused code elimination
- **Source Maps**: Development debugging support
- **Environment-specific Builds**: Dev/prod configurations

## 🔄 Migration Status

### ✅ Completed
- [x] React 19+ setup with Vite
- [x] TypeScript configuration with path aliases
- [x] TailwindCSS with custom theme
- [x] Ant Design integration with custom styling
- [x] React Router with protected routes
- [x] Internationalization with RTL support
- [x] Zustand state management
- [x] React Query for server state
- [x] Feature-based architecture
- [x] Authentication system
- [x] Layout components
- [x] CSS fixes and optimizations

### 🚧 In Progress
- [ ] Component migration from Angular
- [ ] API integration and services
- [ ] Form components with validation
- [ ] Modal and dialog components

### 📋 Todo
- [ ] Case management features
- [ ] Document upload functionality
- [ ] Calendar integration
- [ ] Admin panel features
- [ ] Testing setup (Jest)
- [ ] Performance optimization
- [ ] PWA features

## 🌟 Key Features

1. **Modern Architecture**: Feature-based organization
2. **Type Safety**: Full TypeScript support
3. **Performance**: React Query, code splitting, lazy loading
4. **Accessibility**: ARIA-compliant components
5. **Internationalization**: Multi-language with RTL support
6. **Responsive Design**: Mobile-first approach
7. **Developer Experience**: Hot reload, fast builds, path aliases

## 🤝 Contributing

1. Follow the feature-based architecture
2. Use TypeScript for all new code
3. Add proper type definitions
4. Include translations for new text
5. Test components thoroughly
6. Follow the existing code patterns

## 📄 License

This project is part of the RA Ticketing System migration.

## 🔧 Development Notes

### CSS Structure
The global CSS file (`src/index.css`) follows proper CSS import order:
1. Google Fonts import
2. Tailwind directives
3. Custom styles and overrides

### State Management Pattern
- **Client State**: Zustand for UI state
- **Server State**: React Query for API data
- **Form State**: React Hook Form for forms

### Component Organization
- **Shared Components**: Reusable across features
- **Feature Components**: Specific to business logic
- **Layout Components**: Page structure and navigation
