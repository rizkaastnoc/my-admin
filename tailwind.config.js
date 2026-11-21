/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    500: '#6366F1',
                    600: '#4F46E5',
                    800: '#3730A3',
                    950: '#1E1B4B',
                },
                dark: { 900: '#111827' },
                error: { 500: '#EF4444' },
            },
            zIndex: { '-1': '-1' },
            maxWidth: { 250: '250px', 450: '450px' },
            boxShadow: { 'theme-xs': '0 1px 2px rgba(0,0,0,0.05)' },
        },
    },
    plugins: [
        flowbite,
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
