module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description:"Konverty Bair",
  },
  plugins: [
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL:"https://locale-convert-bair-6f893e44a0f3.herokuapp.com" || "http://localhost:1337",
        availableLngs: ['en', 'uk-UA'],
        queryLimit: 1000,
        collectionTypes: [
          "products",
          "accessories",
          "test-locales"
        ],
        singleTypes: [
          "home-page",
          "home-page-meta",
          "conditions"
        ]
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/logo-black.svg`, // This path is relative to the root of the site.
      }
    },
    "gatsby-plugin-use-query-params",
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-TFH9DGP",
        includeInDevelopment: false,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-image"
  ],
  flags: {
    DEV_SSR: true
  },
}

