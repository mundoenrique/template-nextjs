//Internal app
import { bdb, coop, novo } from '.';

type ConfigProps = {
  favicon: string;
  imagesFooter: string[];
  networks: { facebook?: string; instagram?: string; twitter?: string; youtube?: string; linkedin?: string } | string;
};

const getConfigTenant: { [key: string]: ConfigProps } = {
  bdb: bdb,
  coop: coop,
  novo: novo,
};

export const handleConfigTenant = (tenant: string) => {
  const configTenant = !!getConfigTenant[tenant] ? getConfigTenant[tenant] : getConfigTenant['novo'];

  return configTenant;
};
