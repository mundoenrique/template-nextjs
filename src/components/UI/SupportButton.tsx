'use client';

import Image from 'next/image';
import Sun from '@mui/icons-material/WbSunny';
import Moon from '@mui/icons-material/Nightlight';
import Settings from '@mui/icons-material/SettingsSuggest';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import TextIncrease from '@mui/icons-material/TextIncrease';
import TextDecrease from '@mui/icons-material/TextDecrease';
//Internal App
import logoEn from '%/images/lang/en.png';
import logoEs from '%/images/lang/es.png';
import { useTranslation } from '@/app/i18n/client';
import { useFontSizeStore, useLangStore, useModeStore } from '@/store';

export default function SupporButton(): JSX.Element {
  const { lang, changeLang } = useLangStore();
  const { mode, changeMode } = useModeStore();
  const { addCount, removeCount, fontSize } = useFontSizeStore();
  const currentLang = lang === 'en' ? 'es' : 'en';
  const currentMode = mode === 'light' ? 'dark' : 'light';
  const { t } = useTranslation();
  const changeTextMode = mode === 'light' ? t('modeDark') : t('modeLight');

  return (
    <SpeedDial
      ariaLabel='SpeedDial basic example'
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<Settings />}
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
        icon={mode === 'light' ? <Moon /> : <Sun />}
      />
      <SpeedDialAction
        onClick={() => (fontSize > -1 ? removeCount() : '')}
        tooltipTitle={t('textDecrease')}
        icon={<TextDecrease />}
      />
      <SpeedDialAction
        onClick={() => (fontSize < 2 ? addCount() : '')}
        tooltipTitle={t('textIncrease')}
        icon={<TextIncrease />}
      />
    </SpeedDial>
  );
}
