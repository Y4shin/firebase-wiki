/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
          t: {
              reg: {
                  lgt: { DEFAULT: '#374151', hgl: '#000000' },
                  drk: { DEFAULT: '#d1d5db', hgl: '#ffffff' }
              },
              suc: {
                  lgt: { DEFAULT: '#059669', hgl: '#064e3b' },
                  drk: { DEFAULT: '#34d399', hgl: '#d1fae5' }
              },
              fal: {
                  lgt: { DEFAULT: '#dc2626', hgl: '#7f1d1d' },
                  drk: { DEFAULT: '#f87171', hgl: '#fee2e2' }
              }
          },
          p: {
              pri: { lgt: { DEFAULT: '#f3f4f6', hgl: '#9ca3af', bdr: '#9ca3af' }, drk: { DEFAULT: '#111827', hgl: '#4b5563', bdr: '#4b5563' } },
              bgr: { lgt: { DEFAULT: '#d1d5db', hgl: '#6b7280', bdr: '#6b7280' }, drk: { DEFAULT: '#374151', hgl: '#6b7280', bdr: '#6b7280' } },
              acc: { lgt: { DEFAULT: '#f1a31b', hgl: '#f6c165', bdr: '#b97d15' }, drk: { DEFAULT: '#f1a31b', hgl: '#b97d15', bdr: '#f6c165' } },
              suc: { lgt: { DEFAULT: '#34d399', hgl: '#d1fae5', bdr: '#d1fae5' }, drk: { DEFAULT: '#059669', hgl: '#064e3b', bdr: '#064e3b' } },
              fal: { lgt: { DEFAULT: '#f87171', hgl: '#fee2e2', bdr: '#fee2e2' }, drk: { DEFAULT: '#dc2626', hgl: '#7f1d1d', bdr: '#7f1d1d' } },
              inf: { lgt: { DEFAULT: '#818cf8', hgl: '#e0e7ff', bdr: '#e0e7ff' }, drk: { DEFAULT: '#4f46e5', hgl: '#312e81', bdr: '#312e81' } },
              war: { lgt: { DEFAULT: '#fbbf24', hgl: '#fef3c7', bdr: '#fef3c7' }, drk: { DEFAULT: '#d97706', hgl: '#78350f', bdr: '#78350f' } }
          },
      },
      screens: {
        'msm': { 'max': '767px' },
        'mmd': { 'max': '1023px' },
      }
    }
  },
  plugins: [],
}
