import { os, browser } from '@jam3/detect';

import deviceMatrix from './device-matrix.json';

/**
 * Returns if the current browser is supported by the web app
 * The algorithm is inclusive, so we enumerate everything we don't support, after that everything is supported
 *
 * @returns {Boolean} supported
 */
function isSupported() {
  const userBrowser = browser.name;
  const userBrowserVersion = browser.version;
  const userOS = os ? os.name : 'unknown';
  const userOSVersion = os.version === 'Unknown' ? Number.MAX_SAFE_INTEGER : parseFloat(os.version);

  if (os.bot) {
    return true;
  }

  const supportedOsVersion = deviceMatrix[userOS];
  const supportedBrowserVersion = deviceMatrix[userBrowser];

  const supportedVersion = supportedBrowserVersion || supportedOsVersion;

  if (supportedVersion) {
    if (supportedOsVersion !== undefined) {
      if (userOSVersion < supportedOsVersion) {
        return false;
      }
    }

    if (supportedBrowserVersion !== undefined) {
      /* Special contrains here */

      if (userBrowserVersion < supportedBrowserVersion) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Print current browser information
 *
 * @returns {String} Browser|Browser Version|OS|OS Version|UA
 */
function getBrowserInformation() {
  return `
    browser: ${browser.getName()},
    browser version: ${browser.getVersion()},
    os: ${os.getName()},
    os version: ${os.getVersion()},
    ua: ${navigator.userAgent}
  `;
}

export { isSupported, getBrowserInformation };
