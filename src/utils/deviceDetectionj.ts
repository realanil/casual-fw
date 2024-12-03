// utils/deviceDetection.js

export const isMobileDevice = (): string => {
  const userAgent = window.navigator.userAgent;
  return "desktop";///Mobi|Android/i.test(userAgent)? "mobile": "desktop";
};

export const isMobile = (): boolean => {
  const userAgent = window.navigator.userAgent;
  return /Mobi|Android/i.test(userAgent)? true: false;
};
