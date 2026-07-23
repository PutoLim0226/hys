// src/components/SeoHead.jsx - Dynamic SEO Metadata Injection

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const SeoHead = ({ title, description, image, type = 'website' }) => {
  const { lang, t } = useLanguage();
  const siteName = `${t('brandName')} ${t('brandSub')}`;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc = t('about.metaDesc');
  const metaDescription = description || defaultDesc;
  const metaImage = image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=1200&q=80';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <html lang={lang} />

      {/* Open Graph Tags */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:type" content={type} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
};
