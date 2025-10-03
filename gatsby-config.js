module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: "Konverty Bair",
    siteUrl: "https://konverty.bair.ua",
  },
  proxy: {
    prefix: "/gtm",
    url: "https://konverty.bair.ua",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        createLinkInHead: true,
        sitemapSize: 0,
        resolveSiteUrl: () => "https://konverty.bair.ua",
        resolvePages: (props) => {
          const { allSitePage, allStrapiProducts, allStrapiAccessories, allStrapiMittens, allStrapiFootmuffs, allStrapiCarSeats, allStrapiBeds } = props;

          const sitePages = (allSitePage?.nodes || []).map(page => ({
            path: page.path,
            lastmod: new Date().toISOString().split("T")[0],
          }));

          const strapiPages = [
            ...(allStrapiProducts?.nodes || []),
            ...(allStrapiAccessories?.nodes || []),
            ...(allStrapiMittens?.nodes || []),
            ...(allStrapiFootmuffs?.nodes || []),
            ...(allStrapiCarSeats?.nodes || []),
            ...(allStrapiBeds?.nodes || []),
          ].map(item => ({
            path: `/${item.url}/`,
            lastmod: item.updatedAt ? item.updatedAt.split("T")[0] : new Date().toISOString().split("T")[0],
          }));

          return [...sitePages, ...strapiPages];
        },
        serialize: (page) => ({
          url: page.path,
          changefreq: "weekly",
          priority: 0.7,
          lastmod: page.lastmod,
        }),
        query: `
          {
            allSitePage { nodes { path } }
            allStrapiProducts { nodes { url updatedAt } }
            allStrapiAccessories { nodes { url updatedAt } }
            allStrapiMittens { nodes { url updatedAt } }
            allStrapiFootmuffs { nodes { url updatedAt } }
            allStrapiCarSeats { nodes { url updatedAt } }
            allStrapiBeds { nodes { url updatedAt } }
          }
        `,
      },
    },

    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: "https://locale-convert-bair-6f893e44a0f3.herokuapp.com",
        queryLimit: 1000,
        collectionTypes: [
          "products",
          "accessories",
          "beds",
          "car-seats",
          "footmuffs",
          "mittens"
        ],
        singleTypes: ["home-page", "home-page-meta", "conditions", "catalog-page-meta"],
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
        icon: `src/images/logo-black.svg`,
      },
    },

    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-TFH9DGP",
        includeInDevelopment: false,
      },
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
    "gatsby-plugin-image",
  ],

  flags: {
    DEV_SSR: true,
  },
};
