const tenantInfo:any = {
  "bdb":{
    title: 'Empresas Banco de Bogotá',
    description: 'Aqui la descripción'
  },
  "coop":{
    title: 'Empresas Coopcentral',
    description: 'Aqui la descripción'
  }
}

export const metaDataTenant = (tenant:any) => {
 return tenantInfo[tenant]
}
