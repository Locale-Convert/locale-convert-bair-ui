import React from "react";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};

export const wrapRootElement = ({ element }) => {
  return <HelmetProvider context={helmetContext}>{element}</HelmetProvider>;
};

export const onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes,
  setPreBodyComponents,
}) => {
  const helmet = helmetContext.helmet;

  if (helmet) {
    setHtmlAttributes(helmet.htmlAttributes.toComponent());
    setBodyAttributes(helmet.bodyAttributes.toComponent());
  }

  // GTM скрипт
  const gtmHeadScript = (
    <script
      key="gtm-script"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          '/gtm/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TFH9DGP');
        `,
      }}
    />
  );

  const gtmNoScript = (
    <noscript
      key="gtm-noscript"
      dangerouslySetInnerHTML={{
        __html: `<iframe src="/gtm/ns.html?id=GTM-TFH9DGP" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
  );

  setPreBodyComponents([gtmNoScript]);

  const headComponents = [
    <script
      key="cookieyes-script"
      id="cookieyes"
      type="text/javascript"
      src="https://cdn-cookieyes.com/client_data/4fed877fca09200e1cf12a29/script.js"
    />,
    gtmHeadScript,
    helmet ? helmet.title.toComponent() : null,
    helmet ? helmet.link.toComponent() : null,
    helmet ? helmet.meta.toComponent() : null,
    helmet ? helmet.noscript.toComponent() : null,
    helmet ? helmet.script.toComponent() : null,
    helmet ? helmet.style.toComponent() : null,
  ].filter(Boolean);

  setHeadComponents(headComponents.flat());
};
