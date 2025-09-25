import "./src/styles/fonts.css";
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { initTracking } from './src/utils/tracking';

export const onClientEntry = () => {
  initTracking();
};

export const wrapRootElement = ({ element }) => {
  return <HelmetProvider>{element}</HelmetProvider>;
};
