const {heroui} = require('@heroui/theme');
// tailwind.config.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { nextui } = require('@nextui-org/react');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "// Add your app files\\\\n    './components/**/*.{js,ts,jsx,tsx,mdx}'",
    "// Add your component files\\\\n    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'",
    "./node_modules/@heroui/theme/dist/components/(date-picker|input|navbar|button|ripple|spinner|calendar|date-input|form|popover).js"
  ],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		colors: {
        'vivid-violet': '#9333ea',
        'electric-purple': '#5a17dd',
        'vivid-orange': '#f98f03',
        'gunmetal': '#0f172a',
  			primary: {
  				purple: '#9333ea'
  			},
  			secondary: {
  				'100': '#9353D3',
  				'200': '#17C964',
  				'300': '#FFFFFF'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [nextui(),require('tailwind-scrollbar'),heroui()],
};
