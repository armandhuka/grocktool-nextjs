/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			inter: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'card-foreground': 'hsl(var(--card-foreground))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			'popover-foreground': 'hsl(var(--popover-foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-foreground': 'hsl(var(--primary-foreground))',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'secondary-foreground': 'hsl(var(--secondary-foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			'muted-foreground': 'hsl(var(--muted-foreground))',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'accent-foreground': 'hsl(var(--accent-foreground))',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			'destructive-foreground': 'hsl(var(--destructive-foreground))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			'toolnest-bg': 'hsl(var(--toolnest-bg))',
  			'toolnest-accent': 'hsl(var(--toolnest-accent))',
  			'toolnest-text': 'hsl(var(--toolnest-text))',
  			
  			// GrockTool Brand Colors
  			'grocktool': {
  				primary: '#2563eb',     // Blue
  				secondary: '#7c3aed',   // Purple
  				accent: '#059669',      // Emerald
  				dark: '#1e293b',        // Slate
  				light: '#f8fafc',       // Slate 50
  			},
  			
  			// Category Colors for Tools
  			'category': {
  				text: '#dc2626',        // Red-600
  				image: '#ea580c',       // Orange-600
  				developer: '#059669',   // Emerald-600
  				calculator: '#2563eb',  // Blue-600
  				converter: '#7c3aed',   // Purple-600
  				health: '#db2777',      // Pink-600
  				seo: '#ca8a04',         // Yellow-600
  				security: '#dc2626',    // Red-600
  				'date-time': '#0891b2', // Cyan-600
  				'number': '#9333ea',    // Purple-600
  			},
  			
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		
  		// Background Images for Gradients
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'hero-pattern': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  			'tool-card': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  		},
  		
  		// Box Shadows
  		boxShadow: {
  			'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  			'card': '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
  			'card-hover': '0 20px 40px 0 rgba(0, 0, 0, 0.15)',
  			'tool': '0 2px 10px 0 rgba(0, 0, 0, 0.08)',
  			'tool-hover': '0 10px 30px 0 rgba(0, 0, 0, 0.12)',
  		},
  		
  		// Animations
  		animation: {
  			float: 'float 6s ease-in-out infinite',
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'slide-down': 'slideDown 0.5s ease-out',
  			'scale-in': 'scaleIn 0.3s ease-out',
  			'bounce-gentle': 'bounceGentle 2s infinite',
  			'shimmer': 'shimmer 2s infinite',
  			'pulse-soft': 'pulseSoft 2s infinite',
  		},
  		
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideDown: {
  				'0%': {
  					transform: 'translateY(-20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					transform: 'scale(0.9)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			bounceGentle: {
  				'0%, 100%': {
  					transform: 'translateY(-5%)',
  					animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
  				},
  				'50%': {
  					transform: 'translateY(0)',
  					animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-468px 0'
  				},
  				'100%': {
  					backgroundPosition: '468px 0'
  				}
  			},
  			pulseSoft: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.8'
  				}
  			}
  		},
  		
  		// Custom Utilities
  		backdropBlur: {
  			xs: '2px',
  		},
  		
  		// Z-Index Scale
  		zIndex: {
  			'60': '60',
  			'70': '70',
  			'80': '80',
  			'90': '90',
  			'100': '100',
  		},
  		
  		// Line Clamp for text truncation
  		lineClamp: {
  			7: '7',
  			8: '8',
  			9: '9',
  			10: '10',
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/line-clamp'),
  ],
}