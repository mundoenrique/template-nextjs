//Internal App
import { configTenant, tenantInfo } from "@/config";

export const handleMetaDataTenant = (tenant: any) => tenantInfo[tenant]

export const handleConfigTenant = (tenant: any) => configTenant[tenant]
