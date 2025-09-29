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
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
            allStrapiProducts {
              nodes { url updatedAt }
            }
            allStrapiAccessories {
              nodes { url updatedAt }
            }
            allStrapiMittens {
              nodes { url updatedAt }
            }
            allStrapiFootmuffs {
              nodes { url updatedAt }
            }
            allStrapiCarSeats {
              nodes { url updatedAt }
            }
            allStrapiBeds {
              nodes { url updatedAt }
            }
          }
        `,
        serialize: ({ 
          allSitePage, 
          allStrapiProducts, 
          allStrapiAccessories,
          allStrapiMittens,
          allStrapiFootmuffs,
          allStrapiCarSeats,
          allStrapiBeds
        }) => {
          const pages = allSitePage.nodes.map(page => ({
            url: `https://konverty.bair.ua${page.path}`,
            changefreq: "weekly",
            priority: 0.7,
            lastmod: new Date().toISOString().split("T")[0],
          }));

          const strapiItems = [
            ...allStrapiProducts.nodes,
            ...allStrapiAccessories.nodes,
            ...allStrapiMittens.nodes,
            ...allStrapiFootmuffs.nodes,
            ...allStrapiCarSeats.nodes,
            ...allStrapiBeds.nodes,
          ].map(item => ({
            url: `https://konverty.bair.ua/${item.url}/`,
            changefreq: "weekly",
            priority: 0.9,
            lastmod: item.updatedAt.split("T")[0],
          }));

          return [...pages, ...strapiItems];
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://konverty.bair.ua",
        sitemap: "https://konverty.bair.ua/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: "https://locale-convert-bair-6f893e44a0f3.herokuapp.com" || "http://localhost:1337",
        availableLngs: ["en", "uk-UA"],
        queryLimit: 1000,
        collectionTypes: [
          "products",
          "accessories",
          "beds",
          "car-seats",
          "footmuffs",
          "mittens",
          "characteristics",
          "product-characteristics",
          "values",
        ],
        singleTypes: ["home-page", "home-page-meta", "conditions", "catalog-page-meta"],
      },
    },

    // Manifest
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

    // Google Tag Manager
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-TFH9DGP",
        includeInDevelopment: false,
      },
    },

    // Файли та зображення
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
