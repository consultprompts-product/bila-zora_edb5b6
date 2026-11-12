/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ['./public/**/*.html', './public/assets/js/**/*.js'],
    // index.html is re-serialized, which entity-encodes & < > in attributes;
    // decode them so arbitrary variants like [&>a]:block are still found.
    transform: {
      html: (content) => content
        .replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'").replace(/&amp;/g, '&'),
    },
  },
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-display, "Playfair Display")', 'Georgia', 'serif'],
        sans: ['var(--font-body, "Plus Jakarta Sans")', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
