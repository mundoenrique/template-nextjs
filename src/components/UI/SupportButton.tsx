'use client';

import Image from 'next/image';
import Sun from '@mui/icons-material/WbSunny';
import Moon from '@mui/icons-material/Nightlight';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
//Internal App
import logoEn from '%/images/lang/en.png';
import logoEs from '%/images/lang/es.png';
import { UtilsProps } from '@/interfaces';
import { useTranslation } from '@/app/i18n/client';
import { useLangStore, useModeStore } from '@/store';

export default function SupporButton({ tenant }: UtilsProps): JSX.Element {
  const { lang, changeLang } = useLangStore();
  const { mode, changeMode } = useModeStore();
  const currentLang = lang === 'en' ? 'es' : 'en';
  const currentMode = mode === 'light' ? 'dark' : 'light';
  const { t } = useTranslation(`${tenant}-general`);
  const changeTextMode = mode === 'light' ? t('modeDark') : t('modeLight');

  return (
    <SpeedDial
      ariaLabel='SpeedDial basic example'
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        onClick={() => changeLang(currentLang)}
        key='lang'
        tooltipTitle={t('lang')}
        icon={<Image src={lang === 'en' ? logoEs : logoEn} width={25} height={25} alt={lang} priority />}
      />
      <SpeedDialAction
        onClick={() => changeMode(currentMode)}
        tooltipTitle={t('mode', { mode: changeTextMode })}
        icon={mode === 'light' ? <Moon color='primary' /> : <Sun color='primary' />}
      />
    </SpeedDial>
  );
}
