"use client";

import { useRouter } from "next/navigation";
import { Button, Box } from "@mui/material";
//Internal App
import NavBar from "@/app/components/UI/NavBar";
import { useLangStore } from "@/store/langStore";
import { useTranslation } from "@/app/i18n/client";

export default function Signin({ params }: any) {
  const router = useRouter();

  const language = useLangStore((state: any) => state.lang);
  const { t } = useTranslation(language, `${params.tenant}-general`);

  return (
    <>
      <NavBar tenant={params.tenant} />

      <Box sx={{ m: "auto", maxWidth: 700, width: "100%" }}>
        <Button
          onClick={() => router.push(`/${params.tenant}/dashboard`)}
          fullWidth
          size="large"
          variant="contained"
        >
          {t("buttons.accept")}
        </Button>
      </Box>
    </>
  );
}
