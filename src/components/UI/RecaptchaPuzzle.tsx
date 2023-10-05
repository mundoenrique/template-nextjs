'use client';

import { useRef } from "react";
import SliderCaptcha, { ActionType } from "rc-slider-captcha";
import createPuzzle from "create-puzzle";
import { Button } from '@mui/material';

import {
	Dialogs
} from '@/components/UI';
import { useTranslation } from "@/app/i18n/client";

export default function RecaptchaPuzzle({showPuzzle, setShowPuzzle}:any): JSX.Element {

	const { t } = useTranslation();
	const offsetXRef = useRef(0);
	const actionRef = useRef<ActionType>();
	const num = Math.floor(Math.random() * 10 + 1);

	return (
		<>
			<Dialogs
        open={showPuzzle}
        maxWidth='xs'
        title={'verificación de seguridad'}
        msgDialog={
          <SliderCaptcha
						request={() =>
							createPuzzle(`${process.env.NEXT_PUBLIC_PATH_URL}/images/puzzle/imagen_${num}.jpg`, {
								format: "blob",
								borderWidth: 1,
								width: 45,
								height: 45,
								imageWidth: 300,
								imageHeight: 330
							}).then((res:any) => {
								offsetXRef.current = res.x + 5;
								return {
									bgUrl: res.bgUrl,
									puzzleUrl: res.puzzleUrl
								};
							})
						}
						onVerify={async (data) => {
							if (
								data.x >= offsetXRef.current - 5 &&
								data.x < offsetXRef.current + 5
							) {
								return Promise.resolve();
							}
							return Promise.reject();
						}}
						actionRef={actionRef}
						showRefreshIcon={false}
						loadingDelay={200}
						loadingBoxProps={{
							text: t('loading')
						}}
						tipText={{
							default: t('puzzle_action'),
							loading: t('loading'),
							moving: t('puzzle_moving'),
							verifying: t('puzzle_verifyng'),
							error: t('puzzle_error')
						}}
					/>
        }
        buttonDialog={
          <>
            <Button
              variant='text'
							onClick={() => {
								actionRef.current?.refresh()
                setShowPuzzle(false)
              }}
            >
              {t('buttons.close')}
            </Button>
          </>
        }
      />
		</>
	)
}
