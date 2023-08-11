'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Grid } from '@mui/material';
//Internal App
import { UtilsProps } from '@/interfaces';
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';
import { getImages, handleConfigTenant } from '@/utils';

export default function Footer({ tenant }: UtilsProps): JSX.Element {
  const theme = useTheme();
  const { lang } = useLangStore();
  const { t } = useTranslation(lang, `${tenant}-general`);
  const { imagesFooter, networks } = handleConfigTenant(tenant);

  return (
    <Box
      component='footer'
      sx={{
        alignItems: 'center',
        marginTop: 'auto',
        display: 'flex',
        bgcolor: theme.palette.grey[50],
        padding: { xs: '1rem', sm: '2rem' },
        position: 'relative',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Grid container columns={12} spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box sx={{ display: 'flex', m: { xs: 1, sm: 0 } }}>
            {imagesFooter.map((img: string, i: number) => {
              return (
                <Image
                  key={i}
                  src={getImages(tenant, `${img}.svg`)}
                  style={{
                    objectFit: 'contain',
                    height: '20px',
                    margin: '0 8px',
                    width: 'auto',
                  }}
                  alt={`${img}`}
                  priority
                />
              );
            })}
          </Box>

          {networks !== '' ? (
            <Divider orientation='vertical' sx={{ display: { xs: 'none', sm: 'block' }, m: 2 }} />
          ) : (
            ''
          )}

          <Box sx={{ display: networks !== '' ? 'flex' : 'contents', m: { xs: 1, sm: 0 } }}>
            {Object.keys(networks).map((img, i) => (
              <Link href={networks[img]} key={i} style={{ height: '20px' }}>
                <Image
                  src={getImages(tenant, `${img}.svg`)}
                  style={{
                    objectFit: 'contain',
                    height: '20px',
                    margin: '0 8px',
                    width: 'auto',
                  }}
                  alt={`${img}`}
                  priority
                />
              </Link>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'block' } }}>
          {t('copyright', {
            year: new Date().getFullYear(),
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
