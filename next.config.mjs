/** @type {import('next').NextConfig} */
import withNextra from 'nextra';

const nextraConfig = withNextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
});

export default nextraConfig;