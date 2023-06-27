// const dictionaries = (
//   tenant: any,
//   locale: {
//   en: () => Promise<any>,
//   es: () => Promise<any>
// }) => {

//   const langTenant = {
//     en: () => import(`../dictionaries/${tenant}/en.json`).then((module) => module.default),
//     es: () => import(`../dictionaries/${tenant}/es.json`).then((module) => module.default),
//   }

//   return langTenant[locale]()

// }

// export const getDictionary = async (tenant: any, locale: any) => {

//   let langDirectories;

//   try {
//     langDirectories = dictionaries( tenant, locale );
//   } catch (error) {
//     langDirectories = dictionaries('novo', locale);
//   }

//   return langDirectories;

// }

const dictionaries: any = {
  'bdb': {
    en: () => import('../dictionaries/bdb/en.json').then((module) => module.default),
    es: () => import('../dictionaries/bdb/es.json').then((module) => module.default),
  },
  'coop': {
    en: () => import('../dictionaries/coop/en.json').then((module) => module.default),
    es: () => import('../dictionaries/coop/es.json').then((module) => module.default),
  },
  'novo': {
    en: () => import('../dictionaries/novo/en.json').then((module) => module.default),
    es: () => import('../dictionaries/novo/es.json').then((module) => module.default),
  }

}

export const getDictionary = async (tenant: any, locale: any) => {
  let langDirectories;

  try {
    langDirectories = dictionaries[tenant][locale]();
  } catch (error) {
    langDirectories = dictionaries['novo'][locale]();
  }

  return langDirectories;
}