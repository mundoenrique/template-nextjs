"use client";

import Image from "next/image";
import { Button, Typography } from "@mui/material";
//Internal App
import { getDictionary } from "../dictionaries";

export default async function Signin({ params }: any) {
  const t = await getDictionary(params.tenant, "es");

  return (
    <>
      <Typography>Cliente {params.tenant}</Typography>

      <Image
        src={`/images/${params.tenant}/img-logo-color.svg`}
        width={100}
        height={100}
        // fill={true}
        alt="Picture of the author"
        priority
      />
      <Button type="submit" fullWidth size="large" variant="contained">
        {t.buttons.accept}
      </Button>
    </>
  );
}
