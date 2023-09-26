type ConfigProps = {
  favicon: string;
  imagesFooter: string[];
  networks: { facebook?: string; instagram?: string; twitter?: string; youtube?: string; linkedin?: string } | string;
};

type TenantProps = {
  novo: ConfigProps;
  bdb: ConfigProps;
  coop: ConfigProps;
};

const configTenant: TenantProps = {
  novo: {
    favicon: `${process.env.NEXT_PUBLIC_PATH_URL}/images/novo/favicon.ico`,
    imagesFooter: ['novopayment', 'pci'],
    networks: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
      linkedin: '',
    },
  },
  bdb: {
    favicon: `${process.env.NEXT_PUBLIC_PATH_URL}/images/bdb/favicon.ico`,
    imagesFooter: ['img-logo-color'],
    networks: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
  },
  coop: {
    favicon: '',
    imagesFooter: ['img-logo-color', 'pci'],
    networks: '',
  },
};

export const handleConfigTenant = (tenant: string) => configTenant[tenant as keyof typeof configTenant];
