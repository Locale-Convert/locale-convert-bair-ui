// src/utils/tracking.js

/**
 * Extracts a cookie value by its name.
 * @param {string} name The name of the cookie.
 * @returns {string|undefined} The cookie value or undefined if not found.
 */
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
};

/**
 * Extracts UTM parameters from the current URL.
 * @returns {Object} An object containing UTM parameters.
 */
const getUTMParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  utmKeys.forEach(param => {
    if (urlParams.has(param)) {
      utmParams[param] = urlParams.get(param);
    }
  });

  return utmParams;
};

/**
 * Initializes tracking by collecting and storing marketing data in localStorage.
 */
export const initTracking = () => {
  // GCLID is often set by Google Ads and might not be in the URL.
  // In a non-GTM setup, we'll primarily rely on URL parameters or other scripts that place it.
  // For now, we'll attempt to get it from the URL like other params.
  const urlParams = new URLSearchParams(window.location.search);
  const gclid = urlParams.get('gclid');
  const fbclid = urlParams.get('fbclid');

  const fbc = getCookie('_fbc');
  const fbp = getCookie('_fbp');
  const referrer = document.referrer;
  const utmParams = getUTMParameters();

  const hasDataToStore = gclid || fbclid || fbc || fbp || Object.keys(utmParams).length > 0 || referrer;
  const isNotInternalReferrer = !referrer || !referrer.includes(window.location.hostname);

  if (hasDataToStore && isNotInternalReferrer) {
    const gclids = JSON.parse(localStorage.getItem('gclids')) || [];
    const fbclids = JSON.parse(localStorage.getItem('fbclids')) || [];
    const referrers = JSON.parse(localStorage.getItem('referrerUrls')) || [];
    const utmStorage = JSON.parse(localStorage.getItem('utmParams')) || [];

    const storageLimit = 5;
    if (gclids.length >= storageLimit) {
      gclids.shift();
      fbclids.shift();
      referrers.shift();
      utmStorage.shift();
    }

    gclids.push(gclid || '');
    fbclids.push(fbclid || '');
    referrers.push(referrer || '');
    utmStorage.push(Object.keys(utmParams).length > 0 ? utmParams : {});

    localStorage.setItem('gclids', JSON.stringify(gclids));
    localStorage.setItem('fbclids', JSON.stringify(fbclids));
    localStorage.setItem('referrerUrls', JSON.stringify(referrers));
    localStorage.setItem('utmParams', JSON.stringify(utmStorage));

    if (fbc) {
      localStorage.setItem('fbc', fbc);
    }
    if (fbp) {
      localStorage.setItem('fbp', fbp);
    }
  }
};
