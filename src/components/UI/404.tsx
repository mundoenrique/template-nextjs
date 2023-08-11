'use client';

import styles from '@/styles/not-found.module.scss';
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';

export default function PageNotFound({ tenant }: any) {

  const { lang } = useLangStore();
  const { t } = useTranslation(lang, `${tenant}-general`);

  return (
    <div id="notfound">
      <div className={styles.notfound}>
        <div className={styles['notfound-404']}>
          <h1>404</h1>
        </div>
        <h2>{ t('page-not_found') }</h2>
        <p> { t('message-not-found') } </p>
        <a href="/" className={styles['notfound-a']}>
          { t('buttons.homepage') }
        </a>
      </div>
    </div>
  );
};
