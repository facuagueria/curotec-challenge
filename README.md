# Curotec Challenge

The application includes a dashboard with statistics and an interactive movie list.

## Core Technologies

- Vue 3 with Composition API
- TypeScript
- Tailwind CSS
- Vite
- Pinia (state management)
- Vue Router
- Chart.js for visualizations
- Vitest for unit testing
- Playwright for E2E testing
- shadcn-vue for UI components

## Project Structure

```
src/
├── assets/         # CSS files and static resources
├── components/     # Reusable Vue components
│   ├── App/       # Application-specific components
│   ├── ui/        # Base UI components (shadcn)
│   ├── movies/    # Movie-related components
│   └── dashboard/ # Dashboard components
├── composables/   # Vue composables
├── router/        # Vue Router configuration
├── stores/        # Pinia stores
├── services/      # Application services
├── repositories/  # Data access layer
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── views/         # Page/view components
```

## Features

- Dashboard with movie statistics
- Movie list with filtering and sorting
- Movie rating system
- Responsive design
- Toast notifications
- Page navigation

## TODO

### Testing Improvements
- Implement E2E tests with Playwright
- Increase unit test coverage
- Add integration tests for core components

### Future Features
- Implement user authentication
- Add movie comment system
- Integrate advanced search with multiple filters
- Add multi-language support

### Optimizations
- Improve performance with lazy loading
- Implement data caching
- Optimize images and assets
- Add component documentation with Storybook

## Project Setup

1. Install dependencies:
```sh
pnpm install
```

2. Start development server:
```sh
pnpm dev
```

3. Build for production:
```sh
pnpm build
```

## Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm test:unit`: Run unit tests
- `pnpm test:e2e`: Run end-to-end tests
- `pnpm lint`: Run ESLint
- `pnpm format`: Format code with Prettier

## Workflow

1. User accesses the application and is directed to the dashboard
2. Dashboard displays general statistics and charts
3. Movies page shows an interactive table
4. Users can:
   - View movie details
   - Rate movies
   - Filter and sort the list
   - View real-time statistics

## Testing

The application includes:

- Unit tests with Vitest
- E2E tests with Playwright

## Development Considerations

- TypeScript for type safety
- Component-based architecture
- Recommended Vue 3 design patterns
- Centralized state management with Pinia
- Reusable UI components with shadcn-vue

## System Requirements

- Node.js 18+
- pnpm 9+