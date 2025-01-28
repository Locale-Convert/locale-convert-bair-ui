import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Seo({
     title = "",
     description = "",
     children
   }) {
  const { site } = useStaticQuery(
    graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `
  )
  const metaDescription = description || site.siteMetadata.description
  return (
    <>
      <title>{`${title} | Конверти Bair`}</title>
      <meta name="description" content={metaDescription} data-react-helmet={"true"}/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"/>
      <meta name="apple-mobile-web-app-capable" content="no"/>
      <meta name="mobile-web-app-capable" content="no"/>
      <meta name="google-site-verification" content="GN2zB7NWU3ANuQdgIqDXPz3GnnTSXRnY6oP5FCSfAjM" />
     {children}
    </>
  )
}
