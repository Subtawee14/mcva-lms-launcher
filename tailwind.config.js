/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        fontFamily: {
            sarabun: ['Sarabun', 'sans-serif']
        },
        extend: {
            colors: {
                cv: {
                    gray: '#555555',
                    blue: '#018ADA',
                    orange: '#FFA200',
                    green: '#A2FF00',
                    disable: {
                        gray: '#AAAAAA'
                    },
                    light: { gray: '#EEEEEE' }
                }
            },
            screens: {
                tablet: '768px',
                desktop: '1024px'
            }
        }
    },
    content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}']
}
