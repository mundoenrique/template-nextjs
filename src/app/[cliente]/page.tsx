'use client'

import { getDictionary } from './dictionaries'
import { Button } from '@mui/material';

export default async function Home({params}:any) {

 const t = await getDictionary('en')

return (
 <>
 Aqui la info {params.cliente}
 <Button type='submit' fullWidth size="large" variant="contained" >
    {t.buttons.accept}
 </Button>
 </>
)

}