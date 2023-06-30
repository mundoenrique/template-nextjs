import { Metadata } from "next";
//Internal App
import { configTenant } from "@/config";
import MuiProvider from "../MuiProvider";
import { handleConfigTenant, handleMetaDataTenant } from "@/utils";
import { GenerateMetadataProps, RootLayoutProps } from "@/interfaces";
import SupporButton from '@/components/ui/Supportbutton'

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const datos = handleMetaDataTenant(params.tenant);
  const faviconTenant = handleConfigTenant(params.tenant);
  const faviconDefault = handleConfigTenant('novo');

  const urlFavicon =
    params.tenant in configTenant && faviconTenant?.favicon !== ''
      ? faviconTenant?.favicon
      : faviconDefault?.favicon;

  return {
    title: datos?.title || "Admin Console",
    icons: [
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "32x32",
        url: urlFavicon,
      },
    ],
  };
}

export default async function SigninLayout({
  children,
  params,
}: RootLayoutProps) {
  return <MuiProvider theme={`theme-${params.tenant}`}>
   {children}
   <SupporButton />
   </MuiProvider>;
}
