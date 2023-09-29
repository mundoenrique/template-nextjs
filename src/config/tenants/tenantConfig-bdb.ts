import { tenantConfig as novoConfig } from './tenantConfig-novo';

let config = {
  favicon: `${process.env.NEXT_PUBLIC_PATH_URL}/images/bdb/favicon.ico`,
  imagesFooter: ['img-logo-color'],
  networks: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
};

export let tenantConfig = { ...novoConfig, ...config };
