module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    './pages/*.js',
    './pages/*.jsx',
    './pages/**/*.js',
    './pages/**/*.jsx',
    './components/*.js',
    './components/*.jsx',
    './components/**/*.js',
    './components/**/*.jsx',
  ],
  safelist: [],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(25px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-25px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'show-pop-up': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.90) translateY(-25px)',
          },
          '75%': {
            opacity: '1',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1.0) translateY(0px)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 500ms cubic-bezier(.23,.69,.69,1.0) both',
        'fade-in-down': 'fade-in-down 500ms cubic-bezier(.23,.69,.69,1.0) both',
        'show-pop-up': 'show-pop-up 500ms cubic-bezier(.23,.69,.69,1.0) both',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        disabled: {
          DEFAULT: '#d1d5db',
          transparency: '#d1d5db40',
        },
        white: {
          DEFAULT: '#f7f7f7',
        },
      },
    },
    scale: {
      0: '0',
      25: '.25',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      98: '.98',
      100: '1',
      102: '1.02',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
      200: '2',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      dark: '0px 5px 22px -8px #8fead750',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '200%': '200%',
      '300%': '300%',
    },
  },
  variants: {
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
  },
  plugins: [],
};
