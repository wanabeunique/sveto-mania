

export default function mobileCheck() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    vars.document.documentement.classList.add('page--android');
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    vars.document.documentement.classList.add('page--ios');
    return "iOS";
  }

  return "unknown";
};
