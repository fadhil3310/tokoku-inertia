import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})

// Intercept every back navigation requests to start our view transtions.
navigation.addEventListener('navigate', (event) => {
  if (event.navigationType === 'traverse' && event.canIntercept) {
    event.intercept({
      async handler() {        
        const transition = document.startViewTransition();
      }
    });
  }
});
