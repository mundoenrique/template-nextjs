import { MuiProvider } from "../MuiProvider"
import { Metadata, ResolvingMetadata } from 'next'
import { metaDataTenant } from "@/utils/tenat"

type Props = {
 params: { cliente: string }
}

export async function generateMetadata( { params }: Props, parent: ResolvingMetadata): Promise<Metadata> {

 const datos = metaDataTenant(params.cliente)

 return {
   title: datos?.title || 'Empresas',
   icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      sizes: '32x32',
      url: `${process.env.NEXT_PUBLIC_PATH_URL}/favicon/icon-${params.cliente}.ico`
    }
   ]
 }
}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params:any }) {

  return (
    <html lang="en">
      <body>
        <MuiProvider theme={`ligth-theme-${params.cliente}`}>
        	{children}
        </MuiProvider>
      </body>
    </html>
  )
}
