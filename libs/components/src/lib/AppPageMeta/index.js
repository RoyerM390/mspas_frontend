import React from 'react';
import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';

const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://cra.cremawork.com';

const defaultTitle = 'MSPAS';
const defaultDescription = 'Crema is purely based on Ant Design UI components.';
const defaultImage = '';
const defaultTwitter = '@crema';
const defaultSep = ' | ';

const AppPageMeta = ({ children, ...rest }) => {
  const {
    title,
    description,
    image,
    category = 'Admin Theme',
    tags = ['Ant Design Admin Theme', 'Ant Design Nextjs'],
  } = rest;
  const theTitle = title
    ? title?.length > 48
      ? title
      : title + defaultSep + defaultTitle
    : defaultTitle;
  const theDescription = description
    ? description.substring(0, 155)
    : defaultDescription;
  const theImage = image ? `${SITE_URL}${image}` : defaultImage;

  return (
    <>
      <NextSeo
        title={theTitle}
        description={theDescription}
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: 'https://www.url.ie/a',
          title: theTitle,
          description: theDescription,
          images: [
            {
              url: theImage,
              width: 800,
              height: 600,
              alt: 'Crema Admin Template',
              type: 'image/jpeg',
            },
            {
              url: theImage,
              width: 900,
              height: 800,
              alt: 'Crema Admin Template',
              type: 'image/jpeg',
            },
          ],
          site_name: 'Crema Admin Template',
        }}
        tags={tags}
        category={category}
        twitter={{
          handle: defaultTwitter,
          site: '@crema',
          cardType: 'summary_large_image',
        }}
      />
      {children}
    </>
  );
};

export default AppPageMeta;

AppPageMeta.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
};
