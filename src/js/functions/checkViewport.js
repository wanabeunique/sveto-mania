import vars from '../default/_vars';

export const isMobile = () => {
  if (window.innerWidth <= vars.breakpoints.smallTablet) {
    return true;
  }

  return false;
};

export const isTablet = () => {
  if (window.innerWidth > vars.breakpoints.smallTablet && window.innerWidth <= vars.breakpoints.tablet) {
    return true;
  }

  return false;
};

export const isDesktop = () => {
  if (window.innerWidth > vars.breakpoints.tablet) {
    return true;
  }

  return false;
};
