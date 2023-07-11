export const configTenant: any = {
  "novo": {
    title: 'Empresas Novopayment',
    description: 'Descripción Novo',
    favicon: `${process.env.NEXT_PUBLIC_PATH_URL}/images/novo/favicon.ico`,
    imagesFooter: ['novopayment', 'pci'],
    networks: {
      'facebook': '',
      'instagram': '',
      'twitter': '',
      'youtube': '',
      'linkedin': ''
    }
  },
  "bdb": {
    title: 'Empresas Banco de Bogotá',
    description: 'Descripción BDB',
    favicon: `${process.env.NEXT_PUBLIC_PATH_URL}/images/bdb/favicon.ico`,
    imagesFooter: ['img-logo-color'],
    networks: {
      'facebook': '',
      'instagram': '',
      'twitter': '',
    }
  },
  "coop": {
    title: 'Empresas Coopcentral',
    description: 'Descripción Coop',
    favicon: '',
    imagesFooter: ['img-logo-color', 'pci'],
    networks: ''
  }
}