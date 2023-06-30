"use client"

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useLangStore } from '@/store/langStore';
import logoEn from '%/images/lang/en.png';
import logoEs from '%/images/lang/es.png';
import Image from 'next/image';

export default function BasicSpeedDial() {

 const nextLang = useLangStore((state: any) => state.lang)
 const { changeLang } = useLangStore()
 const alterLang = nextLang === 'es' ? 'en' : 'es'

  return (
    <>    
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >        
          <SpeedDialAction
            onClick={() => changeLang(alterLang)}
            key='lang'
            tooltipTitle='Language'
            icon={<Image src={nextLang === 'es' ? logoEn : logoEs} alt='lang' />}
          />        
      </SpeedDial>
    </>
  );
}