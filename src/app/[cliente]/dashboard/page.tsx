"use client"

import { Button } from '@mui/material';
export default function Dashboard({params}:any) {

return (
 <>
 Dashboard para: {params.cliente}
 <Button type='submit' fullWidth size="large" variant="contained" >
    Aceptar
 </Button>
 </>
)

}