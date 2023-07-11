"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { Box, Divider, Grid, Stack } from "@mui/material";
//Internal App
import { UtilsProps } from "@/interfaces";
import { useLangStore } from "@/store/langStore";
import { useTranslation } from "@/app/i18n/client";
import { getImages, handleConfigTenant } from "@/utils";

export default function Footer({ tenant }: UtilsProps) {
  const nextLang = useLangStore((state: any) => state.lang);
  const { t } = useTranslation(nextLang, `${tenant}-general`);
  const { imagesFooter, networks } = handleConfigTenant(tenant);
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        alignItems: "center",
        bgcolor: theme.palette.grey[50],
        display: "flex",
        height: "120px",
        padding: "1rem",
        textAlign: "center",
        bottom: 0,
        position: "absolute",
        width: "100%",
      }}
    >
      <Grid container columns={12} spacing={2}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            spacing={2}
            divider={
              networks === "" ? (
                ""
              ) : (
                <Divider orientation="vertical" sx={{ ml: 2 }} />
              )
            }
            sx={{
              alignItems: "center",
              height: "20px",
              justifyContent: "center",
            }}
          >
            <Stack direction="row" spacing={2}>
              {imagesFooter.map((img: string, i: number) => {
                return (
                  <Image
                    key={i}
                    src={getImages(tenant, `${img}.svg`)}
                    style={{
                      objectFit: "contain",
                      height: "20px",
                      width: "auto",
                    }}
                    alt={`${img}`}
                    priority
                  />
                );
              })}
            </Stack>

            <Stack direction="row" spacing={2}>
              {Object.keys(networks).map((img, i) => (
                <Link href={networks[img]} key={i} style={{ height: "20px" }}>
                  <Image
                    src={getImages(tenant, `${img}.svg`)}
                    style={{
                      objectFit: "contain",
                      height: "20px",
                      width: "auto",
                    }}
                    alt={`${img}`}
                    priority
                  />
                </Link>
              ))}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {t("copyright", {
            year: new Date().getFullYear(),
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
