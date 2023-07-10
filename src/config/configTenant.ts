export const configTenant: any = {
  "novo": {
    title: 'Empresas Novopayment',
    description: 'Descripción Novo',
    favicon: `${process.env.NEXT_PUBLIC_PATH_URL}/images/novo/icon-novo.ico`,
    imagesFooter: ['novopayment', 'pci'],
    networks: {
      'facebook': 'link facebook',
      'instagram': 'link instagram',
      'twitter': 'link twitter',
      'youtube': 'link youtube',
      'linkedin': 'link linkedin'
    }
  },
  "bdb": {
    title: 'Empresas Banco de Bogotá',
    description: 'Descripción BDB',
    favicon: `${process.env.NEXT_PUBLIC_PATH_URL}/images/bdb/icon-bdb.ico`,
    imagesFooter: ['img-logo-color'],
    networks: {
      'facebook': 'link facebook',
      'instagram': 'link instagram',
      'twitter': 'link twitter',
    }
  },
  "coop": {
    title: 'Empresas Coopcentral',
    description: 'Descripción Coop',
    favicon: `${process.env.NEXT_PUBLIC_PATH_URL}/images/coop/icon-coop.ico`,
    imagesFooter: ['img-logo-color', 'pci'],
    networks: ''
  }
}