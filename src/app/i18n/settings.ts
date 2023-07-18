export const fallbackLng = 'es';
export const languages = [fallbackLng, 'en'];
export const defaultNS = 'novo-general';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
