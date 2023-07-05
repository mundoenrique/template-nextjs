"use client";

import Image from "next/image";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
//Internal App
import logoEn from "%/images/lang/en.png";
import logoEs from "%/images/lang/es.png";
import { SupporButtonProps } from "@/interfaces";
import { useLangStore } from "@/store/langStore";
import { useTranslation } from "@/app/i18n/client";

export default function SupporButton({ tenant }: SupporButtonProps) {
  const nextLang = useLangStore((state: any) => state.lang);
  const { changeLang } = useLangStore();

  const alterLang = nextLang === "en" ? "es" : "en";
  const { t } = useTranslation(nextLang, `${tenant}-general`);

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        onClick={() => changeLang(alterLang)}
        key="lang"
        tooltipTitle={t('lang')}
        icon={<Image src={nextLang === "en" ? logoEs : logoEn} alt={nextLang} />}
      />
    </SpeedDial>
  );
}
