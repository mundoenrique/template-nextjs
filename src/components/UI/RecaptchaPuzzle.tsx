'use client';

import { useRef } from 'react';
import createPuzzle from 'create-puzzle';
import SliderCaptcha, { ActionType } from 'rc-slider-captcha';
//Internal app
import { Dialogs } from '@/components/UI';
import { useTranslation } from '@/app/i18n/client';

export default function RecaptchaPuzzle({ open, close, handlePuzzleVerify, children }: any): JSX.Element {
  const { t } = useTranslation();
  const offsetXRef = useRef(0);
  const actionRef = useRef<ActionType>();
  const num = Math.floor(Math.random() * 10 + 1);

  return (
    <Dialogs
      open={open}
      maxWidth='xs'
      title={'verificación de seguridad'}
      msgDialog={
        <SliderCaptcha
          request={async () =>
						createPuzzle(`${process.env.NEXT_PUBLIC_PATH_URL}/images/puzzle/imagen_${num}.jpg`, {
							borderWidth: 0,
              borderColor: '#fff',
              width: 50,
              height: 40,
              imageWidth: 260,
              imageHeight: 160,
						}).then((res: any) => {
              offsetXRef.current = res.x;
              return {
                bgUrl: res.bgUrl,
                puzzleUrl: res.puzzleUrl,
              };
            })
          }
					onVerify={async (data) => {
            if (data.x >= offsetXRef.current - 5 && data.x < offsetXRef.current + 5) {
              handlePuzzleVerify()
              close(false);
              return Promise.resolve();
            }
            return Promise.reject();
					}}
					bgSize={{
						width: 260,
						height: 160
					}}
					style={{ minWidth: 240, width: '100%' }}
					showRefreshIcon={false}
          actionRef={actionRef}
          loadingDelay={200}
          loadingBoxProps={{
            text: t('loading'),
          }}
          tipText={{
            default: t('puzzle_action'),
            loading: t('loading'),
            moving: t('puzzle_moving'),
            verifying: t('puzzle_verifyng'),
            error: t('puzzle_error'),
          }}
        />
      }
      buttonDialog={children}
    />
  );
}
