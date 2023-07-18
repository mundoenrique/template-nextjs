'use client';

import Image from 'next/image';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
//Internal App
import logoEn from '%/images/lang/en.png';
import logoEs from '%/images/lang/es.png';
import { UtilsProps } from '@/interfaces';
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';

export default function SupporButton({ tenant }: UtilsProps) {
  const { lang, changeLang } = useLangStore();
  const currentLang = lang === 'en' ? 'es' : 'en';
  const { t } = useTranslation(lang, `${tenant}-general`);

  return (
    <SpeedDial
      ariaLabel='SpeedDial basic example'
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        onClick={() => changeLang(currentLang)}
        key='lang'
        tooltipTitle={t('lang')}
        icon={<Image src={lang === 'en' ? logoEs : logoEn} width={25} height={25} alt={lang} priority />}
      />
    </SpeedDial>
  );
}
