 
const dictionaries:any = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  es: () => import('../dictionaries/es.json').then((module) => module.default),
}
 
export const getDictionary = async (locale:any) => dictionaries[locale]()