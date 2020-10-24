module.exports = {
  siteMetadata: {
    title: 'Lava for VSCode',
    description: 'A Gatsby theme for the carbon design system',
    keywords: 'gatsby,theme,carbon',
    lang: 'en',
  },
  pathPrefix: `/vscode-lava-syntax`,
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Lava for VSCode',
        short_name: 'VSCode Lava',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#0062ff',
        display: 'browser',
      },
    },
    {
      resolve: 'gatsby-theme-carbon',
      options: {
        withWebp: false,
        isSearchEnabled: true,
        iconPath: './src/images/LavaCodeIcon.png',
        titleType: 'prepend',
      },
    },
  ],
};
