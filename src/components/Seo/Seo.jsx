import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet-async"; // Використовуємо Helmet як у старому компоненті
import { useLocation } from "@reach/router"; // Додаємо для визначення шляху

export default function Seo({
    title = "",
    description = "",
    productModel,
    children,
}) {
    const { site } = useStaticQuery(
        graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
    );

    // Додаємо location
    const location = useLocation();
    const siteUrl = site.siteMetadata.siteUrl;

    const metaDescription = description || site.siteMetadata.description;
    // Формуємо заголовок як у старому компоненті
    const metaTitle = `${title} | Конверти Bair`;

    // Логіка для Canonical URL
    const path = productModel ? productModel.url : location.pathname;
    let canonicalUrl = new URL(path, siteUrl).href;
    if (path !== '/' && !canonicalUrl.endsWith('/')) {
        canonicalUrl += '/';
    }

    // --- Open Graph & Twitter ---
    const ogType = productModel ? "product" : "website";
    const ogTitle = metaTitle;
    const ogDescription = metaDescription;
    const ogUrl = canonicalUrl;
    let ogImage = `${siteUrl}/images/main_banner.jpg`; // Default for homepage
    let ogImageAlt = "Конверти Bair - головна сторінка";

    if (productModel) {
        // Беремо першу картинку з characteristicsSlider першої видимої розцвітки
        const firstVariant = productModel.colorSlider?.find(v => v.visible) || productModel.colorSlider?.[0];
        if (firstVariant) {
            const productImageUrl = firstVariant.characteristicsSlider?.[0]?.localFile?.publicURL;
            if (productImageUrl) {
                ogImage = `${siteUrl}${productImageUrl}`;
                ogImageAlt = productModel.title;
            }
        }
    }
    // --- End Open Graph & Twitter ---

    // Микроразметка для главной страницы
    let schemaOrganization = null;
    if (location.pathname === "/") {
        schemaOrganization = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Bair Україна",
            "url": siteUrl,
            "logo": `${siteUrl}/images/bair-logo-square.svg`,
            "image": `${siteUrl}/images/main_banner.jpg`,
        };
    }

    // Микроразметка для модели
    let schemaProduct = null;
    if (productModel) {
        const mainVariant = productModel.colorSlider?.find(variant =>
            variant.article === productModel.activeColor
        ) || productModel.colorSlider?.[0];

        const mainImageList = [];
        if (mainVariant) {
            if (mainVariant.imageColor?.localFile?.publicURL) {
                mainImageList.push(`${siteUrl}${mainVariant.imageColor.localFile.publicURL}`);
            }
            if (mainVariant.characteristicsSlider && Array.isArray(mainVariant.characteristicsSlider)) {
                mainVariant.characteristicsSlider.forEach(img => {
                    if (img?.localFile?.publicURL) {
                        mainImageList.push(`${siteUrl}${img.localFile.publicURL}`);
                    }
                });
            }
        }

        const offers = (productModel.colorSlider || []).map(variant => {
            if (!variant.visible) {
                return null;
            }

            let offerImage = null;
            if (variant.imageColor?.localFile?.publicURL) {
                offerImage = `${siteUrl}${variant.imageColor.localFile.publicURL}`;
            } else if (variant.characteristicsSlider && Array.isArray(variant.characteristicsSlider) && variant.characteristicsSlider.length > 0) {
                const firstImage = variant.characteristicsSlider[0];
                if (firstImage?.localFile?.publicURL) {
                    offerImage = `${siteUrl}${firstImage.localFile.publicURL}`;
                }
            }

            const price = variant.colorPrice || productModel.price;
            if (!price) {
                return null;
            }

            const offer = {
                "@type": "Offer",
                "url": new URL(`${productModel.url}#${variant.article}`, siteUrl).href,
                "priceCurrency": "UAH",
                "price": price,
                "sku": variant.article,
                "mpn": variant.article,
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "https://schema.org/InStock",
            };
            if (offerImage) {
                offer["image"] = offerImage;
            }
            return offer;
        }).filter(Boolean);

        schemaProduct = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": productModel.title,
            "image": mainImageList.length > 0 ? mainImageList : undefined,
            "brand": {
                "@type": "Brand",
                "name": "Bair",
            },
            "offers": offers,
        };
    }

    // Використовуємо Helmet для вставки тегів
    return (
        <Helmet htmlAttributes={{ lang: "uk" }}>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={canonicalUrl} />
            
            {/* Всі необхідні мета-теги з нового та старого компонента */}
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="apple-mobile-web-app-capable" content="no" />
            <meta name="mobile-web-app-capable" content="no" />
            <meta name="google-site-verification" content="GN2zB7NWU3ANuQdgIqDXPz3GnnTSXRnY6oP5FCSfAjM" />
            
            {/* Open Graph */}
            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={ogDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:alt" content={ogImageAlt} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Конверти Bair" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={ogTitle} />
            <meta name="twitter:description" content={ogDescription} />
            <meta name="twitter:image" content={ogImage} />

            {/* Вставляємо роздріб для організації (головна сторінка) */}
            {schemaOrganization && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaOrganization)}
                </script>
            )}

            {/* Вставляємо роздріб для товару, якщо вона є */}
            {schemaProduct && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaProduct)}
                </script>
            )}

            {children}
        </Helmet>
    );
}