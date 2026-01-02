/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-dark': '#0f0c29',
                'brand-purple': '#302b63',
                'brand-light': '#24243e',
                'accent-purple': '#6d28d9',
                'accent-pink': '#ec4899',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            },
            backdropBlur: {
                'glass': '4px',
            }
        },
    },
    plugins: [],
}
