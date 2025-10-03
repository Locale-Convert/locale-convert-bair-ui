import React from "react";
import { HelmetProvider } from "react-helmet-async";
import merge from "deepmerge"

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

  // Устанавливаем атрибуты <html> и <body> из Helmet
  if (helmet) {
    setHtmlAttributes(helmet.htmlAttributes.toComponent());
    setBodyAttributes(helmet.bodyAttributes.toComponent());
  }

  // --- Правильная интеграция GTM через прокси ---

  // 1. Основной скрипт GTM для <head>
  // Мы используем стандартный загрузчик GTM, но меняем URL на наш прокси-путь '/gtm/'.
  // Теперь GTM ID (переменная 'i') будет корректно добавляться к запросу.
  const gtmHeadScript = (
    <script
      key="gtm-script"
      dangerouslySetInnerHTML={{
        __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.
                            getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=
                            true;j.src=
                            '/gtm/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-TFH9DGP');
                    `,
      }}
    />
  );

  // 2. Тег <noscript> для GTM (резервный вариант для пользователей без JS)
  // Он должен размещаться в самом начале <body>. Для этого в Gatsby есть setPreBodyComponents.
  // URL здесь также указывает на наш прокси.
  const gtmNoScript = (
    <noscript
      key="gtm-noscript"
      dangerouslySetInnerHTML={{
        __html: `<iframe src="/gtm/ns.html?id=GTM-TFH9DGP" height="0"
                    width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
  );

  // Добавляем noscript в начало <body>
  setPreBodyComponents([gtmNoScript]);

  // Собираем все компоненты для <head>: наш скрипт GTM и все теги из Helmet
  const headComponents = [
    <script
      key="cookieyes-script"
      id="cookieyes" // <-- Этот ID важен для работы CookieYes
      type="text/javascript"
      src="https://cdn-cookieyes.com/client_data/4fed877fca09200e1cf12a29/script.js" // <-- ЗАМЕНИТЕ ЭТОТ URL
    />,
    gtmHeadScript,
    helmet ? helmet.title.toComponent() : null,
    helmet ? helmet.link.toComponent() : null,
    helmet ? helmet.meta.toComponent() : null,
    helmet ? helmet.noscript.toComponent() : null,
    helmet ? helmet.script.toComponent() : null,
    helmet ? helmet.style.toComponent() : null,
  ].filter(Boolean); // Убираем null значения, если helmet еще не отработал;

  // Устанавливаем все компоненты в <head> за один раз
  if (headComponents.length > 0) {
    setHeadComponents(headComponents.flat());
  }
};
