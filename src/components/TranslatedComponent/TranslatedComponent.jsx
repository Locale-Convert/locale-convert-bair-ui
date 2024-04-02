import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../i18n';

const TranslatedComponent = () => {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  return (
    <div>
        Allo
      <h1>{t('welcome')}</h1>
      <p>{t('hello', { name: 'User' })}</p>
    </div>
  );
};

export default TranslatedComponent;
