/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── EXPERIMENTAL black & white theme (local only, not committed) ──
        // Remaps the site's two "brand accent" scales (indigo + violet) onto
        // a pure grayscale/black palette, so every existing `indigo-*` /
        // `violet-*` class site-wide picks up the new monochrome look with
        // zero per-component edits. Revert with `git checkout tailwind.config.js`.
        indigo: {
          50:  '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#18181B', // near-black — primary brand accent
          700: '#111113',
          800: '#09090B',
          900: '#050506',
          950: '#000000',
        },
        violet: {
          50:  '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#27272A',
          700: '#18181B',
          800: '#111113',
          900: '#09090B',
          950: '#000000',
        },
      },
    },
  },
  plugins: [],
}
