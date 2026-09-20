import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#07111D', panel: '#0C1827', line: '#1B2C3E', mint: '#34D399', teal: '#2DD4BF', muted: '#91A5BB', danger: '#FB7185' }, boxShadow: { glow: '0 18px 70px rgba(45,212,191,.15)' } } }, plugins: [] } satisfies Config;

