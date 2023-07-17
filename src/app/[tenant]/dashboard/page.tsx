"use client";

import {
  Button,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useRouter } from "next/navigation";
//Internal App
import NavBar from "@/app/components/UI/NavBar";
import { useLangStore } from "@/store/langStore";
import { useTranslation } from "@/app/i18n/client";

export default function Dashboard({ params }: any) {
  const { lang } = useLangStore();
  const { t } = useTranslation(lang, `${params.tenant}-general`);
  const router = useRouter();

  return (
    <>
      <NavBar tenant={params.tenant} />
      <Box sx={{ mx: "auto", maxWidth: 700, width: "100%" }}>
        <Grid spacing={2} sx={{ my: 5 }} columns={2} container wrap="nowrap">
          <Grid item xs={1}>
            <Card sx={{ maxWidth: 350, width: "100%" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {t("titles.master-acount")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={1}>
            <Card sx={{ maxWidth: 350, width: "100%" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {t("titles.preferencial-acount")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Button
          onClick={() => router.push(`/${params.tenant}/signin`)}
          fullWidth
          size="large"
          variant="contained"
        >
          {t("buttons.close")}
        </Button>
      </Box>
    </>
  );
}
