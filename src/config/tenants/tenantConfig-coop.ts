import { tenantConfig as novoConfig } from './tenantConfig-novo';

let config = {
  imagesFooter: ['img-logo-color', 'pci'],
  networks: '',
};

export let tenantConfig = { ...novoConfig, ...config };
