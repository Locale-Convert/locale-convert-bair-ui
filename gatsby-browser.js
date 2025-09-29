import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { initTracking } from './src/utils/tracking';

export const wrapRootElement = ({ element }) => {
  return <HelmetProvider>{element}</HelmetProvider>;
};

export const onClientEntry = () => {
  initTracking();
};
