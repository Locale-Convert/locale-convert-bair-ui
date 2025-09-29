import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { initTracking } from './src/utils/tracking';

export const wrapRootElement = ({ element }) => <HelmetProvider>{element}</HelmetProvider>;

export const onClientEntry = () => {
  initTracking();
};