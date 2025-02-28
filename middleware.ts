import { middleware } from './src/middleware/metaPixelMiddleware';

export { middleware };

export const config = {
  matcher: [
    '/',
    '/register',
    // Add other paths that need the Meta Pixel tracking
  ]
}; 