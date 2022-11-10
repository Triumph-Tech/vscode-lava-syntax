module.exports = {
  siteMetadata: {
    title: 'Lava for VSCode',
    description: 'Documentation for the Lava for VSCode Plugin',
    keywords: 'Rock RMS,Lava,VSCode',
    lang: 'en',
  },
  pathPrefix: `/`,
  plugins: [
    {
      resolve: 'gatsby-theme-carbon',
      options: {
        withWebp: false,
        isSearchEnabled: true,
        iconPath: './src/images/LavaCodeIcon.png',
        titleType: 'prepend',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-12166118-3",
      }
    },
    {
      resolve: `gatsby-plugin-offline`,
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Lava for VSCode',
        icon: 'src/images/LavaCodeIcon.png',
        short_name: 'VSCode Lava',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#0062ff',
        display: 'minimal-ui',
      },
    }
  ],
};
